package config

import (
	"os"
)

var Conf *Config

type Config struct {
	WebAppUrl      string
	BotApiKey      string
	AnalyticApiKey string
}

// New returns a new Config struct
func New() *Config {
	return &Config{
		WebAppUrl:      getEnv("WEB_APP_URL", ""),
		BotApiKey:      getEnv("TELEGRAM_BOT_KEY", ""),
		AnalyticApiKey: getEnv("ANALYTICS_API_KEY", ""),
	}
}

// Simple helper function to read an environment or return a default value
func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
