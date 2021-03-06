package apiserver

import (
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
	"github.com/typeblind/typeblind/server/db_service/pkg/db"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
)

type APIServer struct{
	Config *Config
	Logger *logrus.Logger
	Router *mux.Router
	DbClient *mongo.Client
}

func New(config *Config) *APIServer {
	client := db.Connect()
	return &APIServer{
		Config: config,
		Logger: logrus.New(),
		Router: mux.NewRouter(),
		DbClient: client,
	}
}

func (s *APIServer) Start() error {
	if err := s.configureLogger(); err !=nil {
		return err
	}

	s.configureRouter()

	s.Logger.Info("starting api server")
	return http.ListenAndServe(s.Config.BindAddr, s.Router)
}

func (s *APIServer) configureLogger() error {
	level, err := logrus.ParseLevel(s.Config.LogLevel)
	if err != nil {
		return err
	}

	s.Logger.SetLevel(level)
	return nil
}

func (s *APIServer) configureRouter() {
	// s.router.HandleFunc("/file/{language}", s.HandleGetFile("go"))
	s.Router.HandleFunc("/", s.HandleHello())
	s.Router.HandleFunc("/find/{language}", s.HandleFind())
	s.Router.HandleFunc("/insert", s.HandleInsert()).Methods(http.MethodPost)
}