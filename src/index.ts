//@ts-nocheck
import mineflayer from 'mineflayer'

const bot = mineflayer.createBot({
    host: 'mc.hypixel.net',
    username: process.env.USERNAME,
    auth: 'microsoft',
    version: '1.8.9'
})

bot.on('message', (jsonMsg) => {
    console.log(jsonMsg.text)
})
bot.on('login', () => {
    bot.waitForTicks(100)
    bot.chat('/play sb')
})


// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)