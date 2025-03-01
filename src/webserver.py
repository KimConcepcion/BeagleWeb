# --------------------------------------------------------------------- #
# External imports
# --------------------------------------------------------------------- #
import tornado.ioloop
import tornado.web
import tornado.httpserver
import sys
import os

# --------------------------------------------------------------------- #
# Local imports
# --------------------------------------------------------------------- #
from Backend.websocket_handler import BeagleWsHandler


# Root dir for web files
DIR_PATH = os.path.join( os.path.dirname(os.path.realpath(__file__)),  "Frontend")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        target_file = os.path.join(DIR_PATH, 'web', 'index.html')
        self.render(target_file)

def make_app():
    return tornado.web.Application([
        (r"/websocket", BeagleWsHandler),
        (r"/", IndexHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': DIR_PATH})
    ])

# --------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------- #
if __name__ == "__main__":
    HOST = '192.168.1.10'
    PORT = '8888'

    # Get ip and port from cmd line args
    if not len(sys.argv) < 3:
        HOST = sys.argv[1]
        PORT = sys.argv[2]
    
    print('HOST: %s is listening on PORT: %s' % (HOST, PORT))
    
    app = make_app()
    tornado.httpserver.HTTPServer(app)    
    app.listen(PORT, HOST)
    tornado.ioloop.IOLoop.current().start()
