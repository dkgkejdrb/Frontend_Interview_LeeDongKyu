## NOTICE

※ 본 소스코드에는 회사의 자산과 민감한 정보는 전부 제거하였으며, 본인(이동규)이 직접 기여하여 작성한 코드만을 업로드하였습니다.

------



## 1. 프로젝트 제목 및 설명

### 제목:

- 초등 고학년 ~ 중학생, AI 리터러시 실습 도구

### 설명:

- 네이버 MOU를 시작으로 CLOVA AI 서비스를 활용하여, AI 학습모델을 코드없이 다뤄보고, AI 서비싱이 가능한 산출물까지 학생이 가져가는 콘텐츠
  - **src > front: 일반 사용자(학생)가 사용하는 실습도구를 구성하는 소스코드**


------



## 2. 본인 기여

- 기획: 실습 도구 기획서(요구명세 / 기능명세 / 백엔드 API 명세) 작성
- 개발: 프론트(메인)

------



## 3. 기술 스택 및 사용된 도구

### 언어 :

- JavaScript(ES6+): 최신 ECMAScript 표준을 사용한 프로그래밍.

### 프레임워크 및 도구:

- react: 프레임워크
- react-router-dom: SPA(Single Page Application) 라우팅 관리
- react-redux: 전역 상태 관리
- antd: UI 컴포넌트로 사용

### 백엔드 통신:

- [CLOVA Studio API](https://api.ncloud-docs.com/docs/ai-naver-clovastudio-completion): CLOVA AI 모델을 사용하기 위한 용도.
- axios: HTTP 클라이언트 라이브러리
- Postman: API 테스팅
