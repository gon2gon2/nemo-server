from datetime import datetime
import time
import requests
SUNGGON_HOOK = r"https://hooks.slack.com/services/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"
SERVER_URL = r"http://34.64.217.3:3000/ping"
CHANNEL_HOOK = r"https://hooks.slack.com/services/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"
headers = {'content-type':'application/json'}

def send_msg(hook, text):
    requests.post(
        hook,
        headers=headers,
        json={
            'text': text
        }
    )

ress = []
while len(ress) < 5:
    res = requests.get(SERVER_URL)

    if res.status_code != 200:
        send_msg(SUNGGON_HOOK, str(datetime.now()))
        ress.append(datetime.now())

    else:
        ress= []

    time.sleep(5)

send_msg(CHANNEL_HOOK, "\t".join(list(map(str,ress))))