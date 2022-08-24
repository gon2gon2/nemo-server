# nemo-express
- 정글 최종 프로젝트 나만의 무기 만들기에서 진행한 네모의 서버 레포지토리입니다.
- 팀원들과 작업했던 레포지토리를 미러링한 레포지토리입니다.

<br/><br/><br/>

## REQUIREMENTS
- docker
- docker-compose
- git
- ".env" file

<br/><br/><br/>

## HOW TO RUN(dev)
1. config 폴더 내에 .env 파일을 생성하시고, 아래 내용을 붙여넣어주세요
```
DEV_HOST=db
DEV_PORT=3306
DEV_USERNAME=root
DEV_ROOT_PASSWORD=spahxptmxm
DEV_DATABASE=test_base
```
2. 아래 커맨드르 입력하세요.
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

## References
[당시 레포](https://github.com/FiveNemos/nemo-express)
[포스터]()
[발표영상](https://youtu.be/_I6NU67zvJQ)