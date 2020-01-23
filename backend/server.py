#!/usr/bin/env python
import os 
import json
import time 

from flask import Flask, request, Response
from flask_cors import cross_origin

from logger import log
import mysql_utils


app = Flask(__name__)

ADDRESS = '0.0.0.0'
PORT = 80

def dumps(data):
    return json.dumps(data, indent=4, sort_keys=True, default=str)


@app.route('/getCities', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_cities():
    fields = ['ID', 'Name', 'CountryCode', 'District', 'Population']
    return Response(dumps(mysql_utils.get_cities(fields = fields, 
                                                limit = 100)))  

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == '__main__':
    try:        
        app.run(ADDRESS, PORT)
        log.info('HTTP server started at %s:%s' % (ADDRESS, PORT))
    except KeyboardInterrupt as e:
        log.error(e)        
        exit()



