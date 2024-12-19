
## Run แบบ Dev บน localhost
```bash
# FE
npm run dev
# BE
python3 app.py
```

## Docker Note
```bash
docker build -t myapp:v1 .

docker run -d -p 8080:80 --name myapp-container myapp:v1
```

## FE
```bash
docker build -t fe-random-exam . 
docker run -p 3000:5173 fe-random-exam
```

## BE
```bash
docker build -t be-random-exam . 
docker run -p 8080:8080 be-random-exam
```



```bash
docker compose up
```



