package analytic

import (
	"binomo-tg-server/config"
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
)

var client = &http.Client{}

func SendAnalyticEvent(userId int64, eventType string) {

	var events = events{
		ApiKey: config.Conf.AnalyticApiKey,
		Events: []event{
			{
				DeviceID:  userId,
				EventType: eventType,
			},
		},
	}
	body, err := json.Marshal(events)
	if err != nil {
		log.Println("Ошибка при преобразовании данных:", err)
		return
	}

	req, err := http.NewRequest("POST", "https://api2.amplitude.com/2/httpapi", bytes.NewBuffer(body))
	if err != nil {
		log.Println("Ошибка при создании запроса:", err)
		return
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "*/*")

	resp, err := client.Do(req)
	if err != nil {
		log.Println("Ошибка при выполнении запроса:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		// Чтение ответа
		responseBody, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Println("Ошибка при чтении ответа:", err)
			return
		}

		log.Printf("запрос в сервсис аналитики неудачный: %s\n", responseBody)
	}
}
