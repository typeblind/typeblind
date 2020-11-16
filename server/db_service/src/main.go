package main

import (
	"log"
	"github.com/kletskovg/typecode/server/db_service/src/internal/apiserver"
)

func main() {
	config := apiserver.NewConfig()
	s := apiserver.New(config)

	if err := s.Start(); err != nil {
		log.Fatal(err)
	}
}
