package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"context"
	log "github.com/sirupsen/logrus"
)

func CheckExsistingCollection(client *mongo.Client, name string, database string) (bool, error) {
	db := client.Database(database)
	collections, collectErr := db.ListCollectionNames(context.TODO() ,bson.D{})

	if collectErr != nil {
		log.WithFields(log.Fields{
			"Err": collectErr,
		}).Error("During search collections")

		return false, collectErr
	}
	
	for i := range collections {
		if name == collections[i] {
			return true, nil
		}
	}

	return false, nil
}