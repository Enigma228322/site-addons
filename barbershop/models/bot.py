from telegram import Update
from telegram.ext import Updater
from telegram.ext import CallbackContext
from telegram.ext import Filters
from telegram.ext import MessageHandler

def message_handler(update: Update, context: CallbackContext):
    update.message.reply_text(
        text="Hello, Vildan!"
    )

def main():
    updater = Updater(
        token='1393404512:AAEIAQ7fJnF1P1vuIbxQw-kwImFK8RBjQ2k',
        use_context=True,
    )

    updater.dispatcher.add_handler(MessageHandler(filters=Filters.all, callback=message_handler))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
