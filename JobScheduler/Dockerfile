FROM python:bullseye

RUN mkdir root/.kube
COPY config root/.kube/

COPY jobscheduler.py .
COPY k8s_job_scheduler.py .
COPY requirements.txt .
RUN pip install -r requirements.txt

RUN apt update
RUN apt install curl gnupg dirmngr apt-transport-https ca-certificates -y
RUN mkdir /etc/apt/keyrings
RUN curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
RUN echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | tee /etc/apt/sources.list.d/kubernetes.list
RUN apt update
RUN apt install kubectl -y

EXPOSE 5000
CMD ["python3", "-m",  "flask", "--app", "jobscheduler.py", "run", "--host=0.0.0.0"]

# docker build -t test
# docker run -it --rm test  --/bin/bash
