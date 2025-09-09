from methods import createUser, deleteUser, updateUser
from flask import Flask
from flask import request
import json
#https://flask.palletsprojects.com/en/stable/quickstart/#variable-rules:~:text=different%20HTTP%20methods.-,from%20flask%20import%20request,-%40app.route

def randomfunc():
    print("this random func was used")

app = Flask(__name__)

@app.route("/")
def hello_world():
    print("index reached")
    return "<p>Index</p>"

@app.route("/registry", methods=['GET', 'POST'])
def registry():
    if request.method == "GET":
        print("GET request received.")
        return "<p>Registry GET</p>"
    
    elif request.method == "POST":
        print("POST request recieved")
        update = request.data.decode()
        update = json.loads(update)

        updateUser(update['id'], update['request'])
        return "<p>Registry POST</p>"