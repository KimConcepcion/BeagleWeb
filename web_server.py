

#########################################################################
#                           I M P O R T S
#########################################################################
import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.httpserver
import os


#########################################################################
#                           C O N S T A N T S
#########################################################################
PORT = 8888
HOST = "192.168.1.34"
DIR_PATH = os.path.join( os.path.dirname(os.path.realpath(__file__)),  "web")


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        target_file = os.path.join(DIR_PATH, "index.html")
        self.render(target_file)

class InternalSystemHandler(tornado.web.RequestHandler):
    def get(self):
        target_file = os.path.join(DIR_PATH, "test.html")
        self.render(target_file)

def make_app():
    return tornado.web.Application([
        (r"/", IndexHandler),
        (r"/test", InternalSystemHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {'path': DIR_PATH})
    ])

#########################################################################
#                           M A I N
#########################################################################
if __name__ == "__main__":
    app = make_app()
    app.default_host
    app.listen(PORT, HOST)
    tornado.ioloop.IOLoop.current().start()
