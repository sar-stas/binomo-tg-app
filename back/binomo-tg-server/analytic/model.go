package analytic

type event struct {
	DeviceID  int64  `json:"device_id"`
	EventType string `json:"event_type"`
	Name      string `json:"name"`
}

type events struct {
	ApiKey string  `json:"api_key"`
	Events []event `json:"events"`
}
