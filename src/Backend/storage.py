"""
Storage Module
"""

# ----- Imports -----
import enum

# ----- Storage Enums -----
class StorageArea(enum.Enum):
    FACTORY     = 1
    USER        = 2
    PROTECTED   = 3


# ----- Storage Class -----
class Storage():
    def __init__(self):
        self.factory = {}
        self.user = {}
        self.protected = {}
    
    def get_storage(self, area):
        if area == StorageArea.FACTORY:
            return self.factory
        elif area == StorageArea.USER:
            return self.user
        elif area == StorageArea.PROTECTED:
            return self.protected
        else:
            return None

    def get(self, area, key):
        storage = self.get_storage(area)
        if storage is not None:
            return storage.get(key)
        return None

    def set(self, area, key, value):
        storage = self.get_storage(area)
        if storage is not None:
            storage[key] = value
            return True
        return False

    def delete(self, area, key):
        storage = self.get_storage(area)
        if storage is not None:
            del storage[key]
            return True
        return False

    def clear(self, area):
        storage = self.get_storage(area)
        if storage is not None:
            storage.clear()
            return True
        return False

    def clear_all(self):
        self.factory.clear()
        self.user.clear()
        self.protected.clear()
        return True
