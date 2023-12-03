from flask import Flask, request
import k8s_job_scheduler

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.post('/job')
def login_post():
    if request.method == 'POST':
        name = request.form['name']
        from_date = request.form['from_date']
        to_date = request.form['to_date']
        if name != None and from_date != None and to_date != None:
            success = k8s_job_scheduler.schedule_job(name, from_date, to_date)
            if success:
                return "<p>Posted new job!</p>"
            else:
                return "<p>Failed to create job. So sad.</p>"
        else:
            return "<p>Wrong input. Need: Name, From Date &amp; To Date</p>"
    else:
        return "<p>Wrong Method!</p>"