# --------------------------------------------------------------------- #
# Imports
# --------------------------------------------------------------------- #
import tornado.ioloop
import tornado.web
import tornado.httpserver
import sys
import os

from Backend.websocket_handler import BeagleWsHandler

# --------------------------------------------------------------------- #
# Data
# --------------------------------------------------------------------- #
DIR_PATH = os.path.join( os.path.dirname(os.path.realpath(__file__)),  "Frontend")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        target_file = os.path.join(DIR_PATH, 'web', 'index.html')
        self.render(target_file)

def make_app():
    return tornado.web.Application([
        (r"/", IndexHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': DIR_PATH}),
        (r"/websocket", BeagleWsHandler)
    ])

# --------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------- #
if __name__ == "__main__":
    # Get ip and port from cmd line args
    if len(sys.argv) < 3:
        print('Usage: server.py <ip_addr> <port_number> ')
    else:
        HOST = sys.argv[1]
        PORT = sys.argv[2]
        
        print('HOST: %s is listening on PORT: %s' % (HOST, PORT))

        app = make_app()
        tornado.httpserver.HTTPServer(app)    
        app.listen(PORT, HOST)
        tornado.ioloop.IOLoop.current().start()
