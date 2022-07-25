# nemo-express
- 네모의 API 서버입니다.
<br/><br/><br/>
## REQUIRMENTS
- docker
- docker-compose
- git

<br/><br/><br/>

## HOW TO RUN(dev)
```bash
git clone https://github.com/FiveNemos/nemo-express.git
cd nemo-express
docker-compose -f docker-compose-dev.yml up --build
```
<br/><br/><br/>

## HOW TO TEST
```bash
DOCKER_BUILDKIT=1 docker build -f Dockerfile-dev -t test .
docker run test npm run test
```
<br/><br/><br/>

## HOW TO DEPLOY
```bash
sh scripts/deploy.sh
```
<br/><br/><br/>

## Project Structure
```
├── bin/www.js          // 포트를 지정하고 서버를 실행하는 스크립트
├── app.js              // root 앱, service들을 붙여준다.
├── services            // 작성한 로직과 controller를 사용해 클라이언트에게 적절한 응답을 보내줌
├── controllers         // db에 query를 날려 결과를 가져옴
├── models              // database의 table 정의
└── tests               // 테스트에서 사용하는 상수와 테스트 코드들
```
