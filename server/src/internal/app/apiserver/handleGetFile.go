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
		file, getFileErr := github.GetFile(extension)
		if getFileErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}
		dbClient := db.Connect()
		db.SaveFileToCache(dbClient)

		lines := splitRawByLines(file)
		result := map[string]interface{}{"data": lines}
		jsonValue, _ := json.Marshal(result)
		w.Write(jsonValue)
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