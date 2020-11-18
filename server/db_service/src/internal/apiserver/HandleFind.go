package apiserver

import (
	"net/http"
	"github.com/kletskovg/typecode/server/db_service/src/internal/db"
	"github.com/kletskovg/typecode/server/db_service/src/internal/utils"
	"github.com/gorilla/mux"
	// "context"
	// "go.mongodb.org/mongo-driver/bson"
)


func (server *APIServer) HandleFind () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		language := params["language"]
		db.FindFile(server.DbClient, language)
		w.Write([]byte("Handle Find File" + language))
	}
}