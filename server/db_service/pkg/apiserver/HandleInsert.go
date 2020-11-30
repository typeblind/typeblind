package apiserver

import (
	"encoding/json"
	log "github.com/sirupsen/logrus"
	"github.com/typeblind/typeblind/server/db_service/pkg/db"
	"github.com/typeblind/typeblind/server/db_service/pkg/utils"
	"io/ioutil"
	"net/http"
)

func (server *APIServer) HandleInsert () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)

		var file db.File
		err := json.NewDecoder(r.Body).Decode(&file)

		if r.Body != nil {
			defer r.Body.Close()
		}

		body,_ := ioutil.ReadAll(r.Body)
		log.Info("REQUEST")
		log.Info(body)
		log.Info(r.Body)

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
