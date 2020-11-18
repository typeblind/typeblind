package apiserver

import (
	"net/http"
	"github.com/kletskovg/typecode/server/db_service/src/db"
	// "context"
	// "go.mongodb.org/mongo-driver/bson"
)


func (server *APIServer) HandleFind () http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		utils.EnableCors(&w)
		params := mux.Vars(r)
		language := params["language"]
		// w.Write(file)
	}
}