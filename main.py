from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext, MessageHandler, Filters
from datetime import time
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

bot_token = "6114234628:AAHu-Us5-oVB1MOW5cvLXz1f3ppKbhrPCVo"
bot_username = '@YourGymBuddyBot'

cred = credentials.Certificate("./telegram.json")
firebase_admin.initialize_app(cred)

quotes_and_tips = [
    "The only bad workout is the one that didn't happen.",
    "Every workout counts, even the ones that didn't feel great.",
    "You don't have to be extreme, just consistent.",
    "Don't limit your challenges, challenge your limits.",
    "Remember, the feeling you get from a good workout is far better than the feeling you get from sitting around wishing you were working out.",
    "Tip: Make sure to stay hydrated during your workout!",
    "Tip: Never skip your warm-up or cool-down, it can help prevent injuries.",
    "Tip: A healthy diet is just as important as a consistent workout.",
]

updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher
job_queue = updater.job_queue

def start(update: Update, context: CallbackContext):
    context.bot.send_message(chat_id=update.effective_chat.id, text="Hello, I am Gym Buddy Bot, I am your personalized gym buddy here to help! Click /help for more!")

def help_command(update: Update, context: CallbackContext):
    help_text = """
Here are the available commands:
/set_reminder <Time> <message> - Set a daily reminder with the given message at the specified time (24-hour format, like 14:30 for 2:30 PM).
/motivation - Get a motivational quote or tip.
    """
    context.bot.send_message(chat_id=update.effective_chat.id, text=help_text)

def set_reminder(update: Update, context: CallbackContext):
    try:
        time_input = context.args[0]
        hour, minute = map(int, time_input.split(":"))
        reminder_message = ' '.join(context.args[1:])

        if reminder_message == '':
            context.bot.send_message(chat_id=update.effective_chat.id, text="Please provide a message for the reminder.")
        else:
            context.job_queue.run_daily(reminder_callback, time(hour, minute), context={'chat_id': update.message.chat_id, 'message': reminder_message})
            context.bot.send_message(chat_id=update.effective_chat.id, text=f"Reminder set for {time_input} every day.")
    except (IndexError, ValueError):
        context.bot.send_message(chat_id=update.effective_chat.id, text="Usage: /set_reminder <Time> <message>")

def reminder_callback(context: CallbackContext):
    job = context.job
    context.bot.send_message(job.context['chat_id'], text=f"Reminder: {job.context['message']}")

def send_motivation(update: Update, context: CallbackContext):
    context.bot.send_message(chat_id=update.effective_chat.id, text=random.choice(quotes_and_tips))

start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)

help_handler = CommandHandler('help', help_command)
dispatcher.add_handler(help_handler)

set_reminder_handler = CommandHandler('set_reminder', set_reminder)
dispatcher.add_handler(set_reminder_handler)

motivation_handler = CommandHandler('motivation', send_motivation)
dispatcher.add_handler(motivation_handler)

updater.start_polling()
updater.idle()
