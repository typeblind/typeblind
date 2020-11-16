package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"github.com/kletskovg/typecode/server/src/internal/github"
	log "github.com/sirupsen/logrus"
	"context"
)

func SaveFileToCache(client *mongo.Client, file github.GhFile) {
	db := client.Database("Gym")

	isExsist,_ := CheckExsistingCollection(client, "cache", "Gym")
	if (isExsist) {
		cache := db.Collection("cache")
		res, err := cache.InsertOne(context.TODO(), bson.M{
			"language": file.Name,
			"htmlUrl": file.Code,
			"rawUrl": file.Owner,
		})

		if err != nil {
			log.Error(err)
		}

		log.Info("created")
		log.Info(res)
	} else {
		jsonSchema := bson.M{
		"bsonType": "object",
		"required": []string{
			"language", 
			"htmlUrl", 
			"rawUrl",
		},
		"properties": bson.M{
			"language": bson.M{
				"bsonType": "string",
			},
			"htmlUrl": bson.M{
				"bsonType": "string",
			},
			"rawUrl": bson.M{
				"bsonType": "string",
			},
		},
		}

		validator := bson.M{
			"$jsonSchema": jsonSchema,
		}

		opts := options.CreateCollection().SetValidator(validator)

		if err := db.CreateCollection(context.TODO(), "cache", opts); err != nil {
			log.Fatal(err)
		} else {
			log.Info("Succesfully create collection")
		}
	}
}

