package main
import (
	"log"
	"github.com/kletskovg/typecode/server/src/internal/app"
)

func main() {
	config := apiserver.NewConfig()
	s := apiserver.New(config)

	if err := s.Start(); err != nil {
		log.Fatal(err)
	}
}
