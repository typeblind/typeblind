package apiserver

import (
	"net/http"
	// "context"
	// "go.mongodb.org/mongo-driver/bson"
)

func (s *APIServer) HandleHello() http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(("Hello world on DB service")))
	}
}
