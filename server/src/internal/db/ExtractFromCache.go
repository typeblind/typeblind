package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	// "github.com/kletskovg/typecode/server/src/internal/github"
	log "github.com/sirupsen/logrus"
	"context"
)


func ExtractFromCache(client *mongo.Client, language string) bson.M {
	db := client.Database("Gym")

	isExsist,_ := CheckExsistingCollection(client, "cache", "Gym")
	var result bson.M

	if (isExsist) {
		cache := db.Collection("cache")

		opts := options.FindOne().SetSort(bson.D{{"age", 1}})
		err := cache.FindOne(context.TODO(), bson.D{{"rawUrl", "Some"}}, opts).Decode(&result)
		if err != nil {
			// ErrNoDocuments means that the filter did not match any documents in the collection
			if err == mongo.ErrNoDocuments {
				return nil
			}
			log.Fatal(err)
		}
	}
	return result
}