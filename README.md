# nemo-express

## 최초 프로젝트 설정(최초 한번만)
1. 저장소를 클론합니다.
`git clone https://github.com/FiveNemos/nemo-express.git`

2. 클론한 저장소를 컨테이너에서 돌립니다.
`docker run -itd -p 3000:3000 --restart=always -v /home/gon2gon2/Nemo/nemo-express:/express --name=api node:lts`
`docker exec -it api /bin/bash`

3. 의존성을 설치합니다.
`cd nemo-express`
`npm install`

4. 터미널을 종료합니다.

## 프로젝트 코드 수정하기
1. vscode의 extension인 docker와 remote-containers를 설치합니다.
2. 왼쪽 탭에서 docker(고래모양)를 클릭합니다.
3. idividual containers를 우클릭합니다.
4. Attach Visual Studio Code를 클릭합니다.
5. 새롭게 열린 vscode에서 코드를 수정합니다.


## 프로젝트(서버) 실행하는 법
1. `DEBUG=myapp:* npm start`
2. localhost:3000 접속하면 응답이 옵니다.


## Project Structure
```
├── app.js
├── bin
├── node_modules
├── package.json
├── package-lock.jsonㅀㅀ
├── public
├── README.md
├── routes
└── views
```
