package db

import (
	"context"
	"github.com/typeblind/typeblind/server/db_service/pkg/consts"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	log "github.com/sirupsen/logrus"
)

func FindFile(client *mongo.Client, language string) {
	db := client.Database("Gym")
	cache := db.Collection("cache", nil)
	findOpts := options.Find().SetBatchSize(consts.MAX_FIND_ARRAY)

	cursor, err := cache.Find(context.TODO(), bson.D{{"language", language}}, findOpts)
	if err != nil {
		log.Fatal(err)
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}
}