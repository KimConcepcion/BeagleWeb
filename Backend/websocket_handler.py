# --------------------------------------------------------------------- #
# Imports
# --------------------------------------------------------------------- #
import tornado.ioloop
import tornado.web
import tornado.websocket

class BeagleWsHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print('WebSocket opened')

    def close(self):
        print('WebSocket closed')

    def on_message(self, message):
        print('Message received: ', message)
    