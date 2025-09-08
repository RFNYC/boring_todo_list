from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
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

