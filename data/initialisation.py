import json
import requests

dataFiles = ["Atlas_Technology-employees.json", "Snazzy_Kangaroo_Consulting-employees.json", "Sonic_Bionics-employees.json"]
headers = {
  'Content-Type': 'application/json'
}
url = "http://localhost:3000/api/signup"

for dataFile in dataFiles:
    data = json.load(open("./{}".format(dataFile)))
    for elem in data:
        payload = json.dumps(elem)
        response = requests.request("POST", url, headers=headers, data=payload)
