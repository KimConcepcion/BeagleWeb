# --------------------------------------------------------------------- #
# Imports
# --------------------------------------------------------------------- #
import tornado.ioloop
import tornado.web
import tornado.websocket

from . import systemStatus

class BeagleWsHandler(tornado.websocket.WebSocketHandler):
    def initialize(self):
        self.rpc = {
            'GetSystemMonitoringData' : self.getSystemData
        }
    
    def open(self):
        print('WebSocket opened')

    def close(self):
        print('WebSocket closed')

    def on_message(self, message):
        print('Message received: ', message)
        self.handleMSG(message)
        
    def handleMSG(self, message):
        is_method_exist = self.rpc.get(message, None)
        
        if is_method_exist:
            print('method found: [%s]' %(message) )
            self.rpc[message]()
    
    def getSystemData(self):        
        sm = systemStatus.SystemMonitor()
        system_monitor_data = sm.getSystemData()
        self.write_message(system_monitor_data)
        