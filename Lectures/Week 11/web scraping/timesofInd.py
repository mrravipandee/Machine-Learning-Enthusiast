import requests


# function for store data into hmtl file
def fetchSaveToFile(base_url, path):
    res = requests.get(base_url)
    with open(path, 'w') as f:
        f.write(res.text)



# url = 'https://timesofindia.indiatimes.com/city/delhi'
url = 'https://www.naukri.com/startup-jobs-570'

fetchSaveToFile(url, 'naukri.html')