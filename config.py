from socket import gethostname
from uuid import uuid5, NAMESPACE_DNS
'''
    config.py
    Configuration module for the server
'''

import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    def __init__(self):
        pass
    VERSION = "1.0"
    AUTHOR = "Jake Lawrence"
    NAME = ""

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    LOGLEVEL = DEBUG
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')
    API_URL = '18.191.144.92'


class ProductionConfig(Config):
    DEBUG = False
    LOGLEVEL = ''
    DB_USER = os.getenv('DB_USER')
    DB_PASS = os.getenv('DB_PASS')
    API_URL = '18.191.144.92'


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': ProductionConfig
}
