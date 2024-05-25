import { Telegraf, Markup } from 'telegraf'

const token = '7021232721:AAECkvfFkObSnQ80YgOrS7x8SyjEadb2u64'
    const webAppUrl = 'https://binomo-bot-f4083.web.app'

const bot = new Telegraf(token)

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать! Нажмите на кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp('Отправить сообщение', `${webAppUrl}`),
        ])
    )
})

bot.launch()

