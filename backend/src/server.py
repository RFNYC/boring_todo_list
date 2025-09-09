from methods import createUser, deleteUser, updateUser
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    print("index reached")
    return "<p>Index</p>"

@app.route("/create")
def create_page():
    print("register reached")

    return "<p>Create User<p>"

@app.route("/delete")
def create_page():
    print("delete reached")
    return "<p>delete User<p>"

@app.route("/update")
def create_page():
    print("update reached")
    return "<p>update User<p>"