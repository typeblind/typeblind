package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	log "github.com/sirupsen/logrus"
	"context"
)

// ClearCache drops cache collection on DB
func clearCache(client *mongo.Client) {
	db := client.Database("Gym")

	cache := db.Collection("cache", nil)
	log.Info("DROPPING CACHE")
	deleteResult, deleteErr := cache.DeleteMany(context.TODO(), bson.D{})

	if deleteErr != nil {
		log.Error(deleteErr)
	}

	if err := db.CreateCollection(context.TODO(), "cache", nil); err != nil {
		log.Fatal(err)
	} else {
		log.Info("Succesfully create collection")
		log.WithFields(log.Fields{
			"result": deleteResult,
		}).Info("Clear cache")
	}
}