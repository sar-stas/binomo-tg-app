package config

import (
	"os"
)

type Config struct {
	WebAppUrl string
	BotApiKey string
}

// New returns a new Config struct
func New() *Config {
	return &Config{
		WebAppUrl: getEnv("WEB_APP_URL", ""),
		BotApiKey: getEnv("TELEGRAM_BOT_KEY", ""),
	}
}

// Simple helper function to read an environment or return a default value
func getEnv(key string, defaultVal string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}

	return defaultVal
}
