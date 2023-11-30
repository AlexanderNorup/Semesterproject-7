FROM python:bullseye

RUN mkdir root/.kube
COPY config root/.kube/

COPY jobscheduler.py .
COPY k8s_job_scheduler.py .
COPY requirements.txt .
RUN pip install -r requirements.txt

RUN apt update
RUN apt install curl -y
RUN apt-get install -y  gnupg dirmngr
RUN mkdir /etc/apt/keyrings
RUN curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list
RUN apt update
RUN apt install kubectl -y

EXPOSE 5000
CMD ["python3", "-m",  "flask", "--app", "jobscheduler.py", "run", "--host=0.0.0.0"]

# docker build -t test
# docker run -it --rm test  --/bin/bash