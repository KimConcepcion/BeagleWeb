# --------------------------------------------------------------------- #
# Imports
# --------------------------------------------------------------------- #
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
import os


# --------------------------------------------------------------------- #
# Constants
# --------------------------------------------------------------------- #
PORT = 8888
HOST = 'localhost'
# HOST = "192.168.1.34"
DIR_PATH = os.path.join( os.path.dirname(os.path.realpath(__file__)),  "Frontend")


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        target_file = os.path.join(DIR_PATH, 'web', 'index.html')
        self.render(target_file)

def make_app():
    return tornado.web.Application([
        (r"/", IndexHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': DIR_PATH})
    ])


# --------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------- #
if __name__ == "__main__":
    app = make_app()
    tornado.httpserver.HTTPServer(app)    
    app.listen(PORT, HOST)
    tornado.ioloop.IOLoop.current().start()