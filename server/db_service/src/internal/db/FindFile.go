package db

import (
	"github.com/kletskovg/typecode/server/db_service/src/internal/consts"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	log "github.com/sirupsen/logrus"
	"context"
	"math/rand"
	"encoding/json"
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
	
	// randIndex := getRandomElement(len(results))
	// var findedFile interface{}
	// err = bson.Unmarshal(results, &findedFile)
}

func getRandomElement (arrayLength int) int {
	getRand := rand.Int63n(int64(arrayLength))
	return int(getRand)
}