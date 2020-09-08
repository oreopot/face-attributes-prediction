FROM python:3.5

WORKDIR /src
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt


COPY ./ /src

EXPOSE 5000
# ENTRYPOINT /bin/bash
CMD python app.py