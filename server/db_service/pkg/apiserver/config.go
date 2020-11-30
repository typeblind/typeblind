package apiserver

type Config struct {
	BindAddr string
	LogLevel string
}

func NewConfig() *Config {
	return &Config {
		BindAddr: ":8082",
		LogLevel: "debug",
	}
}