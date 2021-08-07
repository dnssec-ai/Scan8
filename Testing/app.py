import unittest
import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

mongodbHost = os.getenv("MONGODB_HOST")
mongodbPort = int(os.getenv("MONGODB_PORT"))

client = MongoClient(mongodbHost, mongodbPort)
scan8 = client['scan8']
prequeuedScans = scan8['prequeuedScans']
queuedScans = scan8['queuedScans']
runningScans = scan8['runningScans']
completedScans = scan8['completedScans']

class Testing(unittest.TestCase):
    def testUploadsDirectoryPresent(self):
        self.assertTrue(os.path.isdir(os.getenv("UPLOAD_DIRECTORY")))

    def testResultsDirectoryPresent(self):
        self.assertTrue(os.path.isdir(os.getenv("RESULTS_PATH")))

    def testUploads(self):
        completed = list(completedScans.find())[0]
        id = completed['_id']
        numFiles = completed['files']['total']
        finalDir = os.path.abspath(os.getenv("UPLOAD_DIRECTORY")) + "/" + id
        self.assertEqual(len(os.listdir(finalDir)), numFiles)


if __name__ == '__main__':
    unittest.main()
