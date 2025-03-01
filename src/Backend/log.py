"""
log module
"""

# ---- Imports ----
import logging


# ---- Log Class ----
class Logbook():
    def __init__(self):
        self.logger = logging.getLogger('Beagle')
        self.logger.setLevel(logging.DEBUG)
        
        # create file handler which logs even debug messages
        fh = logging.FileHandler('beagle.log')
        fh.setLevel(logging.DEBUG)
        
        # create console handler with a higher log level
        ch = logging.StreamHandler()
        ch.setLevel(logging.ERROR)
        
        # create formatter and add it to the handlers
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)
        
        # add the handlers to the logger
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)
    
    def debug(self, message):
        self.logger.debug(message)
    
    def info(self, message):
        self.logger.info(message)
    
    def warning(self, message):
        self.logger.warning(message)
    
    def error(self, message):
        self.logger.error(message)
    
    def critical(self, message):
        self.logger.critical(message)
