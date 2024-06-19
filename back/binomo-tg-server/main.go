package main

import (
	"binomo-tg-server/analytic"
	"binomo-tg-server/config"
	"encoding/json"
	"github.com/joho/godotenv"
	"log"
	"path/filepath"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
)

var bundle = i18n.NewBundle(language.English)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func main() {

	config.Conf = config.New()

	webApp := tgbotapi.WebAppInfo{config.Conf.WebAppUrl}

	//localization
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	bundle.MustLoadMessageFile(filepath.Join("i18n", "en.json"))
	bundle.MustLoadMessageFile(filepath.Join("i18n", "es.json"))
	bundle.MustLoadMessageFile(filepath.Join("i18n", "ms.json"))
	bundle.MustLoadMessageFile(filepath.Join("i18n", "pt-br.json"))

	bot, err := tgbotapi.NewBotAPI(config.Conf.BotApiKey)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		localizer := determineLocale(update)
		if update.CallbackQuery != nil {

			callback := tgbotapi.NewCallback(update.CallbackQuery.ID, update.CallbackQuery.Data)
			if _, err := bot.Request(callback); err != nil {
				panic(err)
			}

			descriptionTradingTxt := localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "description_trading",
				},
			})
			msg := tgbotapi.NewMessage(update.CallbackQuery.Message.Chat.ID, descriptionTradingTxt)
			msg.ParseMode = tgbotapi.ModeMarkdown
			msg.ReplyMarkup = tgbotapi.NewInlineKeyboardMarkup(
				tgbotapi.NewInlineKeyboardRow(
					tgbotapi.NewInlineKeyboardButtonWebApp(
						localizer.MustLocalize(&i18n.LocalizeConfig{
							DefaultMessage: &i18n.Message{
								ID: "btn_start_trading",
							},
						}),
						webApp,
					),
				),
			)
			if _, err := bot.Send(msg); err != nil {
				log.Panic(err)
			}
		}

		if update.Message == nil {
			continue
		}

		if !update.Message.IsCommand() { // ignore any non-command Messages
			continue
		}

		msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")
		// Extract the command from the Message.
		switch update.Message.Command() {
		case "start":
			msg.Text = localizer.MustLocalize(&i18n.LocalizeConfig{
				DefaultMessage: &i18n.Message{
					ID: "greeting",
				},
			})
			msg.ReplyMarkup = getKeyboards(localizer, webApp)

			go analytic.SendAnalyticEvent(update.Message.From.ID, "open_app")
		default:
			msg.Text = "I don't know that command"
		}

		if _, err := bot.Send(msg); err != nil {
			log.Panic(err)
		}
	}
}

func determineLocale(update tgbotapi.Update) *i18n.Localizer {
	if update.Message != nil {
		return i18n.NewLocalizer(bundle, update.Message.From.LanguageCode)
	}
	if update.CallbackQuery != nil {
		return i18n.NewLocalizer(bundle, update.CallbackQuery.From.LanguageCode)
	}
	return i18n.NewLocalizer(bundle, "en")
}

func getKeyboards(localizer *i18n.Localizer, webApp tgbotapi.WebAppInfo) tgbotapi.InlineKeyboardMarkup {

	btnStartTraiding := localizer.MustLocalize(&i18n.LocalizeConfig{
		DefaultMessage: &i18n.Message{
			ID: "btn_start_trading",
		},
	})

	btnDescription := localizer.MustLocalize(&i18n.LocalizeConfig{
		DefaultMessage: &i18n.Message{
			ID: "btn_how_to_start_trading",
		},
	})

	return tgbotapi.NewInlineKeyboardMarkup(
		tgbotapi.NewInlineKeyboardRow(
			tgbotapi.NewInlineKeyboardButtonWebApp(
				btnStartTraiding, webApp,
			),
		),
		tgbotapi.NewInlineKeyboardRow(
			tgbotapi.NewInlineKeyboardButtonData(
				btnDescription, "description_trading",
			),
		),
	)
}
