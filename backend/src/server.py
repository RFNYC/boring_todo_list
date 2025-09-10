from methods import createUser, deleteUserEntry, deleteAssignmentEntry, updateUser, createAssignment
from flask import Flask
from flask import request
import json
#https://flask.palletsprojects.com/en/stable/quickstart/#variable-rules:~:text=different%20HTTP%20methods.-,from%20flask%20import%20request,-%40app.route

app = Flask(__name__)

@app.route("/")
def hello_world():
    print("index reached")
    return "<p>Index</p>"

@app.route("/user", methods=['GET','POST'])
def user():
    if request.method == "GET":
        print("GET request received.")
        return "<p>Create GET</p>"
    
    elif request.method == "POST":
        print("POST request recieved")
        user = request.data.decode()
        user = json.loads(user)

        # other elifs can be added later
        if user['request'] == "create":
            print("create request")
            info = user['info']

            try:
                createUser(info['name'], info['email-address'], info['register-date'])
                print("User created successfully.")
            except:
                print("Create request could not be fulfilled.")
        else:
            print("Delete request")
            id = user["_id"]

            try:
                deleteUserEntry(id)
                print("User deleted successfully.")
            except:
                print("Delete request could not be fulfilled.")

        return "<p>user POST</p>"

@app.route("/update-user", methods=['GET', 'POST'])
def update():
    if request.method == "GET":
        print("GET request received.")
        return "<p>Update GET</p>"
    
    elif request.method == "POST":
        print("POST request recieved")
        update = request.data.decode()
        update = json.loads(update)

        updateUser(update['id'], update['request'])
        return "<p>Update POST</p>"
    
@app.route("/assignments", methods=['GET', 'POST'])
def assignments():
    if request.method == "GET":
        print("GET request received.")
        return "<p>Assignment GET</p>"
    
    elif request.method == "POST":
        print("POST request recieved")
        assignment = request.data.decode()
        assignment = json.loads(assignment)

        # other elifs can be added later
        if assignment['request'] == "create":
            print("create request")
            info = assignment['info']
            print(info)
            try:
                createAssignment(
                    
                    task = info['task'], 
                    context = info['context'], 
                    assignor = info['assignor'],
                    assignee_name = info['assignee-name'], 
                    assignee_id = info['assignee-id'],
                    date_assigned = info['date-assigned']
                )    


                print("Assignment created successfully.")
            except Exception as e:
                print("Create request could not be fulfilled.")
                print("Error: ", e)
        else:
            print("Delete request")
            id = assignment["_id"]

            try:
                deleteAssignmentEntry(id)
                print("Assignment deleted successfully.")
            except:
                print("Delete request could not be fulfilled.")

        return "<p>Assignment POST</p>"
    pass