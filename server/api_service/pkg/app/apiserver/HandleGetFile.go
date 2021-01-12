package apiserver

import (
	"bytes"
	"encoding/json"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"github.com/typeblind/typeblind/server/api_service/pkg/consts"
	"github.com/typeblind/typeblind/server/api_service/pkg/github"
	"github.com/typeblind/typeblind/server/api_service/pkg/utils"
	"net/http"
	"strings"
)

func (server *APIServer) HandleGetFile () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		language := params["language"]
		extension := params["extension"]

		log.WithFields(log.Fields{
			"language": language,
		}).Warn("SEE QUERY PARAM")

		file := processFile(language, extension)
		w.Write(file)
	}
}

func splitRawByLines (raw string) [][]string {
	linesSplit := strings.Split(raw, "\n")
	lines := *new([][]string)

	for i := range linesSplit {
		lineSymbols := strings.Split(linesSplit[i], "")
		lines = append(lines, lineSymbols)
	}

	return lines
}

func processFile(language string, extension string) []byte {
	var file = github.GhFile{}

	ghFile, getFileErr := github.GetFile(language, extension)

	if getFileErr != nil {

		cachedFile := getFileFromDB(language)
		lines := splitRawByLines(cachedFile.Code)
		result := map[string]interface{} {
			"data": lines,
			"file": cachedFile.Name,
			"owner": cachedFile.Owner,
		}

		log.Info("FINAL RESULT")
		log.Info(result)

		jsonValue, _ := json.Marshal(result)
		return jsonValue
	} else {
		file.Code = ghFile.Code
	}

	cacheJson,_ := json.Marshal(ghFile)
	requestUrl := []string{consts.DB_SERVICE_URL, "/insert"}
	log.Info("DB REQUEST URL")
	log.Info(requestUrl)
	res, err := http.Post(strings.Join(requestUrl, ""), "application/json", bytes.NewBuffer(cacheJson))

	if err != nil {
		log.Error(err)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	lines := splitRawByLines(file.Code)
	result := map[string]interface{}{
		"data": lines,
		"file": file.Name,
		"owner": file.Owner,
	}
	jsonValue, _ := json.Marshal(result)
	return jsonValue
}

func getFileFromDB(language string) github.GhFile {
	requestUrl := consts.DB_SERVICE_URL + "/find/" + language
	res, err := http.Get(requestUrl)

	if err != nil {
		log.Error(err)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	var file github.GhFile
	log.Info("Result in DB")
	err = json.NewDecoder(res.Body).Decode(&file)
	if err != nil {
		log.Error(err)
	}

	return file
}