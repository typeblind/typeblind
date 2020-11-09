package apiserver

import (
	"net/http"
	"github.com/kletskovg/typecode/server/src/internal/github"
	"strings"
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/gorilla/mux"
	"github.com/kletskovg/typecode/server/src/internal/utils"
)

func (server *APIServer) HandleGetFile (language string) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		extension := params["language"]
		log.WithFields(log.Fields{
			"language": extension,
		}).Warn("SEE QUERY PARAM")
		log.Info("GETTING FILE")
		file, getFileErr := github.GetFile("go")
		log.Warning(file)
		if getFileErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
		}

		log.Info("SPLIT RAW BY LINES FILE")
		lines := splitRawByLines(file)
		log.Info("LINES")
		log.Warning(lines)
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