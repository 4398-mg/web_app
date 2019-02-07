from subprocess import Popen, PIPE
from os.path import expanduser
log = open(expanduser('~')+'/web_app/git_log.txt', 'w')

Popen('git -C /home/ubuntu/web_app/ remote update', stdout=PIPE, stderr=PIPE, shell=True).wait()
Popen('git -C /home/ubuntu/web_app/ status -uno', stdout=log, stderr=PIPE, shell=True).wait()

log.close()

with open(expanduser('~')+'/web_app/git_log.txt','r') as f:
    contents = f.read()

    if('behind' in contents):
        Popen('pkill -f gunicorn', stdout=PIPE, stderr=PIPE, shell=True).wait()
        Popen('git -C /home/ubuntu/web_app/ pull origin master', stdout=PIPE, stderr=PIPE, shell=True).wait()
        Popen('python3 /home/ubuntu/web_app/manage.py gunicorn', stdout=PIPE, stderr=PIPE, shell=True)
