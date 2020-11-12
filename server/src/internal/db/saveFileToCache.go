package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/bson/primitive"
	log "github.com/sirupsen/logrus"
	"context"
)

func SaveFileToCache(client *mongo.Client) {
	db := client.Database("Gym")

	log.Info(db.Name())
	// cursor, err := db.ListCollections(context.TODO(), nil)
	cursor, err := db.ListCollectionNames(context.TODO(), bson.D{})

	if err != nil {
		log.Error("CHECK this error ")
		log.Error(err)
	}

	log.Info(cursor)
}