FROM python:3.8.5-buster

WORKDIR /src
COPY requirements.txt ./

RUN pip install --upgrade pip && \
    pip install --use-feature=2020-resolver --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000 
# ENTRYPOINT /bin/bash
# CMD python app/main.py
CMD gunicorn --reload wsgi:app --log-level=debug -b 0.0.0.0:5000 --threads 2 -w 2 --timeout=500