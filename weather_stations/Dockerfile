
FROM python:3.11
ARG file
WORKDIR /usr/src/app

COPY ["requirements.txt", "./"]
RUN pip install --no-cache-dir -r requirements.txt

RUN echo "[DEBUG] Using file $file.csv"

COPY ["main.py", "$file.csv", "./"]
ENV WEATHERFILE=${file}.csv
CMD ["python", "./main.py"]