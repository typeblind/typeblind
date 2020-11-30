package apiserver

import (
	"github.com/gorilla/mux"
	"github.com/typeblind/typeblind/server/db_service/pkg/db"
	"github.com/typeblind/typeblind/server/db_service/pkg/utils"
	//"go.mongodb.org/mongo-driver/bson"
	"net/http"
	"encoding/json"
)

func (server *APIServer) HandleFind () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		language := params["language"]
		file := db.FindFile(server.DbClient, language)
		//var resultFile db.File
		//bson.Unmarshal(dbFile[0], &resultFile)
		result,_ := json.Marshal(file)
		w.Write(result)
	}
}
