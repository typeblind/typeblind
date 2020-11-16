package apiserver

import (
	"net/http"
	"context"
	"go.mongodb.org/mongo-driver/bson"
)

func (s *APIServer) HandleHello() http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		db := s.dbClient.Database("Gym")
		collections, collectErr := db.ListCollectionNames(context.TODO() ,bson.D{})
		if collectErr != nil {
			
		}
		w.Write([]byte((collections[0])))
	}
}
