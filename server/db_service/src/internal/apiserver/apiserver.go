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
	// var DB_CONNECTION string
	
	// if os.Getenv("DB_CONNECTION")  == "" {
	// 	data,_ := ioutil.ReadFile("config.txt")
	// 	DB_CONNECTION = string(data)
	// } else {
	// 	DB_CONNECTION = os.Getenv("DB_CONNECTION")
	// }

	// log.Info("Starting DB connection")
	// ctx, cancel := context.WithTimeout(context.TODO(), 10*time.Second)
	// defer cancel()
	// client, err := mongo.Connect(ctx, options.Client().ApplyURI(DB_CONNECTION))
	// if err != nil { log.Fatal(err) }
	// log.Info("Successfully connected")
	// log.Info(client)

	// client := db.Connect()
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
}

func (s *APIServer) handleGetFile() http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(("Look to the console")))
	}
}

