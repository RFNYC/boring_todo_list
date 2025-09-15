from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from bson.objectid import ObjectId  # Import ObjectId
from dotenv import find_dotenv, load_dotenv

# Automatically finds the .env path regardless of location
dotenv_path = find_dotenv()

# Loads environment vars found at .env
load_dotenv(dotenv_path)

key = os.getenv('ALPHA')

uri = f"mongodb+srv://rfnyc:{key}@oel-cluster.g8jltxo.mongodb.net/?retryWrites=true&w=majority&appName=OEL-Cluster"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

##################################################################################################################################################

database = client['oel_users']
collection = database['registry']
collection2 = database['assignments']

# After creating a user you should immediately make a call to get that person's ID and then probably
# save it locally or somewhere they can easily access so that u dont have to make extra api calls when updating their account.
def createUser(name, email, register):
    collection.insert_one( 
    {
        'name': f'{name}',
        'email-address': f'{email}',
        'register-date:': f'{register}'
    }
)
    
def createAssignment(task, context, assignor, assignee_name, assignee_id, date_assigned):
    my_result = collection2.insert_one( 
    {
        'task': f'{task}',
        'context': f'{context}',
        'assignor': f'{assignor}',
        'assignee-name': f'{assignee_name}',
        'assignee-id': f'{assignee_id}',
        'date-assigned': f'{date_assigned}'
    }
)
    print("this is the id for the thing u just generated -> ", my_result.inserted_id)
   


# MongoDB generates a unique ID for each entry. So long as its provided the right one this should be fine.
# Since you're going to reuse this func maybe create a log of what each thing actually was and pin it to the ID?
def deleteUserEntry(id):
    collection.delete_one( {'_id': ObjectId(id)} )
    print(f'Successfully deleted: {id}')

# was too lazy to figure out the logic to keep this in one func :sob:
def deleteAssignmentEntry(id):
    collection2.delete_one( {'_id': ObjectId(id)} )
    print(f'Successfully deleted: {id}')

def updateUser(id, request):
    # Request will be a tuple/array with a request code 1 or 2, and a piece of information
    query_filter = {'_id': ObjectId(id)}

    if request[0] == 0:
        update_operation = {
            '$set':
            {'name': request[1]}
        }
        print("Name successfully changed.")

    elif request[0] == 1:
        update_operation = {
            '$set':
            {'email-address': request[1]}
        }
        print("Email successfully changed")
        
    else:
        print("Update Failed.")
        
    collection.update_one(query_filter, update_operation)

