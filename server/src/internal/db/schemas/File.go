package schemas

import (
	"go.mongodb.org/mongo-driver/bson"
)

type schemas struct {
	File bson.M
}

func Schemas() schemas {
	return schemas{
		File: bson.M {
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
		},
	}
}