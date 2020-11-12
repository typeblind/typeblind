package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	log "github.com/sirupsen/logrus"
	"context"
)

func SaveFileToCache(client *mongo.Client) {
	db := client.Database("Gym")
	log.Warning("check db")
	log.Warning(&db)
	collection := client.Database("Gym").Collection("workouts")

	log.Info(collection)

	result,_  := collection.Find(context.Background(), bson.D{{"HELLO", "world"}}, nil)

	log.Warning("Results of workout")
	log.Warning(result)

	if collection == nil {
		log.Info("Collection wasnt found ... creating")
		log.Warning(collection)

		opts := options.CreateCollection()
		
		
			if err := client.Database("gym").CreateCollection(context.Background(), "cache", opts); err != nil {
				log.Error("Error while creating collection")
				log.Error(err)
			}
	}
}