# Frello backend 프로젝트

해당 프로젝트는 Frello 프론트에서 발생하는 사용자 액션을 처리하는
API 서버입니다. Node 기반의 **Koa** 프레임워크와 **MongoDB**로 구현되어
있습니다.

# 프로젝트 환경

> 설치
1. 프로젝트를 클론
2. 프로젝트 루트경로에서 yarn install or npm install 실행
3. yarn start:dev(MAC OS) or yarn start:win(Windows OS), 로컬 서버 실행


프로젝트를 정상적으로 동작시키기 위해서는 **.env** 파일을 추가해야 합니다. **.env**은 포트번호, MongoDB 설정, OAuth 설정 값이 들어가야 합니다. **.env**파일을 프로젝트 루트 경로에 만들고 설정해주세요.

```
PORT
MONGO_URI
MONGODB_NAME
SECRET_KEY
JWT_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# Has to be port 8080
ROOT_URL=http://localhost:8080

[example]
PORT=8080
MONGO_URI=mongodb://localhost/[dbname]
MONGODB_NAME=[dbname]
SECRET_KEY=[test!@#123]
JWT_SECRET=[TEST_JSON_WEB_TOKEN_KEY_!@#$]
GOOGLE_CLIENT_ID=[GOOGLE OAuth client ID]
GOOGLE_CLIENT_SECRET=[GOOGLE OAuth Secret key]
```

# License

**MIT** 라이센스
