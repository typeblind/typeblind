package apiserver

import (
	"net/http"
	"github.com/kletskovg/typecode/server/src/internal/github"
	"strings"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/gorilla/mux"
	"github.com/kletskovg/typecode/server/src/internal/utils"
	"github.com/kletskovg/typecode/server/src/internal/db"
)

func (server *APIServer) HandleGetFile (language string) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		extension := params["language"]

		log.WithFields(log.Fields{
			"language": extension,
		}).Warn("SEE QUERY PARAM")

		file := processFile(extension)
		w.Write(file)
	}
}

func splitRawByLines (raw string) [][]string {
	linesSplit := strings.Split(raw, "\n")
	var lines [][]string = *new([][]string)

	for i := range linesSplit {
    lineSymbols := strings.Split(linesSplit[i], "")
		lines = append(lines, lineSymbols)
	}

  return lines
}

func processFile(extension string) []byte {
	var file = github.GhFile{}
	
	ghFile, getFileErr := github.GetFile(extension)
	
	if getFileErr != nil {
		dbClient := db.Connect()
		cachedFile := db.ExtractFromCache(dbClient, "go")
		log.Info("GIHUB FILE IN PROCESS FILE")
		log.Info(cachedFile)
		
		// if htmlStr, ok := cachedFile["htmlUrl"].(string); ok {
		// 	file.Code = htmlStr
		// }

		htmlStr, _ := cachedFile["htmlUrl"].(string)
		raw, _ := github.GetRawFile(string(htmlStr))
		file.Code = raw

		if name, ok := cachedFile["language"].(string); ok {
			file.Name = name
		}

		if owner, ok := cachedFile["rawUrl"].(string); ok {
			file.Owner = owner
		}
		
		log.Info(file)
		} else {
			// raw, _ := github.GetRawFile(ghFile.Code)
			file.Code = ghFile.Code
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