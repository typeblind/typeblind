package db

import (
	"context"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// ClearCache drops cache collection on DB
func clearCache(client *mongo.Client) {
	db := client.Database("Gym")

	cache := db.Collection("cache", nil)
	log.Info("DROPPING CACHE")
	log.Info(cache)
	_, deleteErr := cache.DeleteMany(context.TODO(), bson.D{})

	if deleteErr != nil {
		log.Error(deleteErr)
	}
}