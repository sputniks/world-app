import os 
import datetime 
import csv 
import mysql.connector
import json 

DB_HOST = "localhost"
DB_NAME = "world"
DB_USER_NAME = "root"
DB_USER_PASSWORD = "password"
DB_PORT = 3306

def get_connector():
    return mysql.connector.connect(
        host=DB_HOST,
        port=DB_PORT or 3306,
        database=DB_NAME,
        user=DB_USER_NAME,    
        passwd=DB_USER_PASSWORD,    
        auth_plugin='mysql_native_password')
    cursor = cnx.cursor(buffered=True)

def fetchall(sql):
    cnx = get_connector()
    cursor = cnx.cursor(buffered=True, dictionary=True)

    cursor.execute(sql)
    rows = cursor.fetchall() 

    cursor.close()
    cnx.close()
    return rows

def get_databases():
    return fetchall("SHOW DATABASES")

def get_tables():
    return fetchall("SHOW TABLES")

def get_cities(fields = "*", limit = None):  
    if fields != "*":  
        fields = ','.join(fields)

    sql = "SELECT %s FROM world.city" % fields

    if limit:
        sql = "%s LIMIT 0, %s" % (sql, limit)

    return fetchall(sql)


if __name__ == '__main__':
    print get_databases()
    print get_tables()
    cities = get_cities(fields = ['ID', 'Name', 'CountryCode', 'District', 'Population'], limit = 100)
    print("cities total:", len(cities))


