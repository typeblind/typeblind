package db

import (
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"context"
	"time"
	"io/ioutil"
	log "github.com/sirupsen/logrus"
)

type File struct {
	Name string
	Code [][]string
	Owner string
	Language string
}

func Connect() *mongo.Client {
	
	var DB_CONNECTION string
	
	if os.Getenv("DB_CONNECTION")  == "" {
		data,_ := ioutil.ReadFile("config.txt")
		DB_CONNECTION = string(data)
	} else {
		DB_CONNECTION = os.Getenv("DB_CONNECTION")
	}
	
	log.Info("Starting DB connection")
	ctx, cancel := context.WithTimeout(context.TODO(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(DB_CONNECTION))
	if err != nil { log.Error(err) }

	log.Info("Successfully connected")
	log.Info(client)

	go clearCache(client)
	return client
}
