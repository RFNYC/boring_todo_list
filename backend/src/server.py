import os
from dotenv import find_dotenv, load_dotenv
from methods import createUser, deleteUserEntry, deleteAssignmentEntry, loginUser, updateUser, createAssignment, checkUserExists
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import json
import datetime
#https://flask.palletsprojects.com/en/stable/quickstart/#variable-rules:~:text=different%20HTTP%20methods.-,from%20flask%20import%20request,-%40app.route

#Automatically finds the .env path regardless of location
dotenv_path = find_dotenv()

# Loads environment vars found at .env
load_dotenv(dotenv_path)

key = os.getenv('EXPO_PUBLIC_BETA')
key2 = os.getenv('EXPO_PUBLIC_SIGMA')

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    print("index reached")
    return "<p>Index</p>"

@app.route("/user", methods=['GET','POST'])
@cross_origin()
def user():
    if request.method == "GET":
        print("GET request received.")
        return "<p>Create GET</p>"
    
    elif request.method == "POST":
        print("POST request recieved")
        user = request.data.decode()
        user = json.loads(user)

        if user['request'] == "create":
            print("create request")
            info = user['info']

            # check for existing email first
            if checkUserExists(info['email-address']) == True:
                # if flask is unable to fetch a password for the given email address it likely doesn't exist.
                print("This email is already associated with another account. Please try another.")
                
            else:
                # when it fails we'll create a user.
                print("reached 9/21")
                result = createUser(info['name'], info['email-address'], info['password'], datetime.datetime.now())

                response = {
                    "signUp": True,
                }

                print("User created successfully.")
                return response

        elif user['request'] == "login":
            print("login request")
            info = user["info"]

            email = info["email-address"]
            password = info["password"]

            try:
                print("login request was sent.")
                result = loginUser(email, password)
                
                # Pivotal piece. You must send a response back to react via object so it can parse it as JSON and utilize this information.
                # Not sending a response of some kind using an object will cause weird errors.
                if result == True:
                    response = {
                        "login": True
                    }
                else:
                    response = {
                        "login": False
                    }

                return response

            except:
                print("login request could not be sent.")

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
        info = '{"request":"create","info":{"task":"Final response instructions","context":"I dont wanna do this shit","assignee:":"self","assignor":"user","assignee-name":"GenAI Assistant","assignee-id":"68c059d795678aa6fe109086","date-assigned":"Wednesday, September 10, 2025"}}'
        return f'{info}'
    
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
                    assignee_name = info['assignee_name'], 
                    assignee_id = info['assignee_id'],
                    date_assigned = info['date_assigned']
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

# This block ensures the server runs only when the script is executed directly
if __name__ == '__main__':
    # The debug=True argument enables the debugger and auto-reloader
    # The host='0.0.0.0' makes the server publicly accessible
    app.run(host='0.0.0.0', port=5000,  debug=True)

