FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip cache purge
RUN pip install --upgrade pip setuptools
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]