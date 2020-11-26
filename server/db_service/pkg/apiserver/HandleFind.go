package apiserver

import (
	"github.com/gorilla/mux"
	"github.com/typeblind/typeblind/server/db_service/pkg/db"
	"github.com/typeblind/typeblind/server/db_service/pkg/utils"
	"net/http"
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
