package apiserver

import (
	"net/http"
	"github.com/sirupsen/logrus"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/kletskovg/typecode/server/db_service/src/internal/db"
	// "go.mongodb.org/mongo-driver/mongo/options"
	// "os"
	// "io/ioutil"
	// log "github.com/sirupsen/logrus"
	// "context"
	// "time"
)

type APIServer struct{
	config *Config
	logger *logrus.Logger
	router *mux.Router
	dbClient *mongo.Client
}

func New(config *Config) *APIServer {
	client := db.Connect()

	return &APIServer{
		config: config,
		logger: logrus.New(),
		router: mux.NewRouter(),
		dbClient: client,
	}
}

func (s *APIServer) Start() error {
	if err := s.configureLogger(); err !=nil {
		return err
	}

	s.configureRouter()

	s.logger.Info("starting api server")
	return http.ListenAndServe(s.config.BindAddr, s.router)
}

func (s *APIServer) configureLogger() error {
	level, err := logrus.ParseLevel(s.config.LogLevel)
	if err != nil {
		return err
	}

	s.logger.SetLevel(level)
	return nil
}

func (s *APIServer) configureRouter() {
	// s.router.HandleFunc("/file/{language}", s.HandleGetFile("go"))
	s.router.HandleFunc("/", s.HandleHello())
	s.router.HandleFunc("/find/{language}", s.HandleFind())
}

