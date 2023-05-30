FROM python:3.6-slim-buster

WORKDIR /app

RUN pip install flask psycopg2-binary Flask-SQLAlchemy flask-cors

COPY . .

EXPOSE 8082

CMD [ "flask", "run", "--host=0.0.0.0", "--port=8082"]