-- Web app --
This is the web application repository for Wimbo, an application that generates music using RNNs.

Features:
- Song generations for Jazz, Folk, Classical, and Game music genres
- Save songs to your history (for logged in users)
- Edit song names
- Delete Songs
- Generate Sheet Music for the generated music

Known bugs:
- There are no known bugs for the web app

Install and Build:
To install and build the web app you must first clone this repository (see below for command)
"git clone https://github.com/4398-mg/web_app"
You must then install the requirements for the project
"pip3 install -r requirements.txt"
From there you should be able to run the web app through the command
"sudo python3 manage.py gunicorn"

Configuration:
The only configuration that needs to be set for the web app is by setting the API URL in the bottom of app/template/index.html (this tells the web app where to make requests to the REST API)
