package apiserver

import (
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/typeblind/typeblind/server/db_service/pkg/db"
	"github.com/typeblind/typeblind/server/db_service/pkg/utils"
	"net/http"
)

func (server *APIServer) HandleInsert () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)

		var file db.File
		err := json.NewDecoder(r.Body).Decode(&file)

		if err != nil {
			defer log.WithFields(log.Fields{
				"file": r.Body,
				"err": err,
			}).Error("During parse request body")
		}

		go db.InsertFile(server.DbClient, file)

		log.Info(file)
		fileMarshal, _ := json.Marshal(file)
		w.Write(fileMarshal)
	}
}