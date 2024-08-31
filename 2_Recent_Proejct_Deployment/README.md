## Project Introduction

This project provides and AI prompts engineering GUI tool and enables the publishing of personalized chatbot landing pages using Naver's HyperClova AI, specifically designed for primary and secondary students.

The main features of this project include a GUI Tool for prompt engineering, a chatbot service generated from GUI tool's outputs, and setting and publishing chatbot landing page on previous practices with NO CODING.



## 설치 및 실행 방법

### 요구사항

- Node.js (최소 v14.0.0 이상)
- npm (Node Package Manager)



### 개발 도구

- IDE: Visual Studio Code
- 언어: Typescript
- 프레임워크: React (v18.3.3)



### Node.js 설치

이 프로젝트를 실행하려면 Node.js가 필요합니다. Node.js와 함께 npm도 자동으로 설치됩니다. 이미 PC에 Node.js가 설치되어 있다면, 해당 단계를 스킵하세요.

1. #### Node.js 다운로드

   Node.js 공식 웹사이트에 접속하여 운영 체제에 맞는 최신 LTS(Long Term Support) 버전을 다운로드합니다.

   

2. #### 설치 실행

   다운로드한 설치 파일을 실행하고 안내에 따라 설치를 완료합니다.

   

3. #### 설치 확인

   터미널(명령 프롬프트)에서 다음 명령어를 입력하여 Node.js와 npm이 올바르게 설치되었는지 확인합니다.

   ```bash
   node -v
   npm -v
   ```

   위 명령어가 각각 Node.js와 npm의 버전을 출력하면, 설치가 성공적으로 완료된 것 입니다.



### 프로젝트 설치 및 실행

1. #### 다운로드

   프로젝트를 다운로드하여 원하는 경로에 압축 해제합니다.

   

2. #### 패키지 설치

   프로젝트의 의존성 패키지를 설치합니다.

   ```bash
   npm install
   ```

3. #### 개발 서버 실행

   개발 환경에서 앱을 실행하기 위해 다음 명령어를 입력합니다.

   ```bash
   npm start
   ```

4. #### 브라우저에서 확인

   실행 후 브라우저에서 http://localhost:3000/ 을 열어 다음과 같은 화면을 확인할 수 있습니다. 홈 화면에서 '시간표 관리로 이동' 버튼을 클릭하여 이동합니다.

   ![](https://codetutorbot.blob.core.windows.net/image/1.png)

   ![](https://codetutorbot.blob.core.windows.net/image/2.png)



## 기본 기능 설명

### 1. 페이지 이동

#### 1.1. 설명

React Router를 사용하여 구현하였으며, 페이지 간의 네비게이션을 담당합니다.



#### 1.2. 프로젝트 내의 파일 위치

- **src/App.tsx** : 라우팅 설정이 포함된 파일
- **src/pages**/ : 페이지 컴포넌트 디렉토리 
  - **Home.tsx** : 홈 페이지
  - **TimeTable.tsx** : 타임테이블 페이지



#### 1.3. 사용한 라이브러리

- **react-router-dom**





### 2. API 연동을 염두한 상태 관리

#### 2.1. 설명

ERP 등에 데이터 등록, 수정을 위한 API 연동을 염두하여 수신한 시간표 데이터를 전역 상태로 관리했습니다. Redux 툴킷을 사용하여 상태를 중앙에서 관리합니다.



#### 2.2. 프로젝트 내의 파일 위치

- **src/store/index.ts** : Redux 스토어 설정
- **src/store/slice/TimeTableSlice.ts** : 시간표 데이터 전역 상태 및 리듀서 관리
- **src/hooks/** : 커스텀 훅 디렉토리
  - **useTimeTableData.tsx** : 시간표 데이터를 수신하기 위한 커스텀 훅.



#### 2.3. 사용한 라이브러리

- **@reduxjs/toolkit**
- **react-redux**





### 3. 시간표 표시

#### 3.1. 설명

태블릿(600px)과 PC(1024px 이상)에서 운영자가 시간표를 설정, 관리할 수 있는 기능을 시각적으로 제공.



#### 3.2. 프로젝트 내의 파일 위치

- **src/pages/TimeTable.tsx** : 시간표를 설정, 관리할 수 있는 페이지
- **src/components/** : 재사용 가능한 UI 컴포넌트 디렉터리
  - **Periods.tsx** : 수업 추가, 삭제, 시간 설정 컴포넌트
  - **MyTimePicker.tsx** : 시간(0~24), 분(0~59)을 선택할 수 있는 컴포넌트. 



#### 3.3. 사용한 라이브러리

- **antd**





## 고도화된 부분

### 1. API 연동을 대비한 설계

ERP 등에서 API로 전달된 정보를 동적으로 표시하기 위해, 컴포넌트를 설계하고 개발했습니다. 프로젝트 시작 전, 필요한 데이터를 화면에 표시될 정보를 고려하여 인터페이스를 정의하고, 이를 바탕으로 더미 데이터를 설정했습니다.

특히, 수업을 추가하거나 제거하는 기능을 리스트 형태로 구현하는 것이 적합하다고 판단하였고, 이로 인해 해당 기능을 수월하게 개발할 수 있었고 테스트와 디버깅할 수 있는 시간을 벌 수 있었습니다.

[API를 통해 동적으로 표시되었을 때 정보 구성]

![](https://codetutorbot.blob.core.windows.net/image/5.png)



[데이터 인터페이스]

```json
// src/hooks/useTimeTableData.tsx
// key: 학급명, Tab에 표시되는 정보. 
// value: 각 학급의 15개 교시를 나타내는 배열. 배열의 총 길이 15로 제한. 배열의 각 요소는 하루 동안의 타임 슬롯이며 필드는 startTime과 endTime을 포함
{
    "2A-1 (201~)": [
        { "startTime": "08:00", "endTime": "08:50" },
        { "startTime": "09:00", "endTime": "10:15" },
        { "startTime": "10:30", "endTime": "12:00" },
        { "startTime": "", "endTime": "" }, // 빈 문자열은 해당 시간대에 수업이 없음을 의미
        { "startTime": "", "endTime": "" }
    ],
    ...
}
```





### 2. 태블릿 화면 최적화

대부분 타블렛을 사용하는 사용자들을 위해, 페이지의 최대 너비를 600px로 설정했습니다. 이를 통해 페이지의 가로 너비를 좁히고, 세로로 더 많은 내용을 표시할 수 있도록 최적화하였습니다.

[태블릿(600px 이상)]

![](https://codetutorbot.blob.core.windows.net/image/3.png)



### 3. 커스텀 컴포넌트

필수 요구 사항에 따라 시간(00~24), 분(00~59)를 선택할 수 있는 외부 라이브러리 중 적합한 것이 없어서 TimePicker를 직접 개발했습니다. 개발 과정에서 제공된 UI에는 사용자가 설정한 데이터를 ERP로 전송하는 흐름을 파악하기 어려웠습니다. 이를 해결하기 위해, 직접 만든 TimePicker에 '확인' 버튼을 추가하였고, 사용자가 이 버튼을 클릭하면 정보가 갱신되고 ERP로 전송되도록 고도화했습니다. '확인' 버튼을 눌러야만, 선택창이 닫히게 하여 사용자의 바른 이용 시나리오를 강제하였습니다.

[MyTimePicker 사용 예]

![](https://codetutorbot.blob.core.windows.net/image/3.gif)





## 마무리하며...

이전 직장에서는 Javascript 만으로 개발을 진행했기에, Typescript를 사용할 기회에 대한 갈증이 있었습니다. 이번 과제를 통해 실전과 같은 환경에서 Typescript를 활용할 수 있어 매우 기뻤습니다. 또한, 과제를 진행하면서 출제자의 의도를 깊이 이해할 수 있었습니다. 단순히 화면을 구현하는 프론트엔드 개발자가 아니라, 요구사항을 충실히 반영하고 데이터 구조를 고려한 효율적인 앱 개발을 경험할 수 있어 매우 인상적이었습니다. 이를 통해 출제자의 고뇌와 실무 경험을 느낄 수 있었습니다.



부족한 제 개발 경력이지만, 이전 직장에서 교육 서비스와 관련된 다양한 경험을 쌓을 수 있었고,개발 외에도 여러 가지 업무를 통해 성장할 수 있었습니다. 그러나 프로젝트가 접혀나가면서 개발 이외의 업무가 주를 이루게 되어, 제 커리어 성장을 위해 퇴사를 결정했습니다. 이번 과제를 통해 다시 한번 성장에 대한 기대감을 갖게 되었고, 귀사에 합류하여 성공적인 서비스에 기여하며 제 기량과 역량을 더욱 발전시키고 싶습니다. 감사합니다.



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
