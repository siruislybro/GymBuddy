from telegram.ext import *
from telegram import *

# Setting up our logger
import logging

bot_token = "6114234628:AAHu-Us5-oVB1MOW5cvLXz1f3ppKbhrPCVo"
bot_username = '@YourGymBuddyBot'

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher

def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text="Hello")

def message_handler(update, context):
    msg = update.message.text
    context.bot.send_message(chat_id=update.effective_chat.id, text=msg)

start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)

catchall_handler = MessageHandler(Filters.text, message_handler)
dispatcher.add_handler(catchall_handler)

updater.start_polling()
updater.idle()
