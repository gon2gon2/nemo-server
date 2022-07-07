# nemo-express
- 네모의 API 서버입니다.

## 옵션 1 - 도커로 프로젝트 설정하기
1. 저장소를 클론합니다.
   - `git clone https://github.com/FiveNemos/nemo-express.git`

2. 클론한 저장소를 컨테이너에서 돌립니다.
   - `docker run -itd -p 3000:3000 --restart=always -v {클론한 프로젝트 경로}/nemo-express:/nemo-express --name=api node:lts`
   - `docker exec -it api /bin/bash`

3. 패키지를 설치합니다.
   - `cd nemo-express`
   - `npm install`

4. 터미널을 종료합니다.

## 프로젝트 코드 수정하기
1. vscode의 extension인 docker와 remote-containers를 설치합니다.
2. 왼쪽 탭에서 docker(고래모양)를 클릭합니다.
3. idividual containers탭의 api 컨테이너를 우클릭합니다.
4. Attach Visual Studio Code를 클릭합니다.
5. 새롭게 열린 vscode에서 코드를 수정합니다.

## 옵션 2 - 로컬 node 사용하여 개발하기
0. nvm을 설치합니다.
   - 맥: `brew install nvm`
1. `nvm install --lts`
2. `nvm use --lts`
3. 저장소를 클론합니다.
   - `git clone https://github.com/FiveNemos/nemo-express.git`
4. 패키지를 설치합니다.
   - `cd nemo-express`
   - `npm install`

## 개발하기
1. `npm run dev`
2. 브라우저로 localhost:3000 접속하면 응답이 옵니다.

## Project Structure
- 우리가 작업할 것들만
```
├── bin/www             // 포트를 지정하고 서버를 실행하는 스크립트
├── app.js              // root 앱, routes에서 생성한 라우터를 여기서 붙여준다
├── routes              // 우리가 작업할 폴더.
└── package.json        // npm install을 하면 이 파일을 참조해 패키질 설치합니다.
```
