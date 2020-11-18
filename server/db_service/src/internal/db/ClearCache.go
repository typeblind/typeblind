package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	log "github.com/sirupsen/logrus"
	"context"
)

// ClearCache drops cache collection on DB
func clearCache(client *mongo.Client) {
	db := client.Database("Gym")

	cache := db.Collection("cache", nil)
	log.Info("DROPPING CACHE")
	dropErr := cache.Drop(context.TODO())

	if dropErr != nil {
		log.Error(dropErr)
	}

	if err := db.CreateCollection(context.TODO(), "cache", nil); err != nil {
		log.Fatal(err)
	} else {
		log.Info("Succesfully create collection")
	}
}