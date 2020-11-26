package main

import (
	"github.com/typeblind/typeblind/server/db_service/pkg/apiserver"
	"log"
)

func main() {
	config := apiserver.NewConfig()
	s := apiserver.New(config)

	if err := s.Start(); err != nil {
		log.Fatal(err)
	}
}
