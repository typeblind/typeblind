package apiserver

type Config struct {
	BindAddr string
	LogLevel string
}

func NewConfig() *Config {
	return &Config {
		BindAddr: ":8081",
		LogLevel: "debug",
	}
}