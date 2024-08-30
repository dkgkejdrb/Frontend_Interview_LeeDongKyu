import { useState, useEffect } from "react";
import { List, Modal, Spin } from 'antd';
import ErrorPage from "../Error/ErrorPage";
import axios from "axios";

// 학급반 학생들의 정보데이터(1.챗봇아이콘, 2.페이지URL, 3.챗봇이름, 4.제목, 5.챗봇목적)
// eslint-disable-next-line
const testData = [
    {
      chatbotIcon: "🐼", pageURL: "https://clovagui-practice-app.azurewebsites.net/#/chatbot/landing/abcd1234", chatbotName: '씨큐브봇', title: '글쓰기 숙제, 틀리기 쉬운 맞춤법! 이젠 틀리지 말자!', chatbotPurpose: '반성문을 제출한적이 있는데, 제가 쓴 글의 맞춤법이 너무 많이 틀려서 담임선생님이 핀잔을 주셨던 기억이 있습니다. 그 때의 기억이 떠올라 반성문이나 국어 레포트 제출용으로 만들었습니다.'
    },
    {
      chatbotIcon: "🌸", pageURL: "https://clovagui-practice-app.azurewebsites.net/#/chatbot/landing/abcd1234", chatbotName: '홍길동챗봇', title: '영재원 제출용 자기소개서 챗봇', chatbotPurpose: '영재원에 지원하기 위해 자소서를 냈어야 한 적이 있는데, 너무 많이 어렵고 괴로웠다. 그때 이 챗봇이 있었다면? 하는 생각으로 만들었습니다. 나같은 어려움을 겪지말기를!! 물론 지금은 영재원 붙어서 행복합니다 ㅎㅎ'
    },
    {
      chatbotIcon: "🌻", pageURL: "https://clovagui-practice-app.azurewebsites.net/#/chatbot/landing/abcd1234", chatbotName: '청담챗봇', title: '카톡 메시지의 감정을 분석하는 챗봇', chatbotPurpose: '난 공감능력이 뛰어나다고 생각하는데... 가끔씩 날아오는 카톡 내용이 부정적인 내용인지 긍정적인 내용인지 아니면 아닌건지 헛갈릴 때가 있다. 나같은 이를 위해 준비했다!'
    },
    {
      chatbotIcon: "🥤", pageURL: "https://clovagui-practice-app.azurewebsites.net/#/chatbot/landing/abcd1234", chatbotName: 'CMS챗봇', title: '동생을 위한 영어교과서 번역 봇~', chatbotPurpose: '나에겐 5살 남동생이 있다. 내 동생은 영어를 가장 어려워하고 맨날 도망만 다닌다. 내 동생을 위해 번역해주는 기특한 챗봇을 만들었습니다. 동생한테 보여주면 엄청신기해할것 같은데? 나도 이런걸 만든 내가 신기하다!'
    },
    {
      chatbotIcon: "🏫", pageURL: "https://clovagui-practice-app.azurewebsites.net/#/chatbot/landing/abcd1234", chatbotName: '학교동아리안내봇', title: '친절한 학교동아리안내봇이랍니다', chatbotPurpose: '우리 동아리는 나를 포함해서 5명밖에 없다. 그나마 1명도 다른학교로 이사간다. 동아리의 원활한 운영을 위해 단원모집이 필요해 만들었다.'
    },
];



const LcmsLandingPageListAuth = () => {
  // ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장
  // 아이프레임 부모로부터 받은 메시지('학생고유번호', '클래스고유번호')
  const [iframeData, setIframeData] = useState({stdId: "", clsId: ""});
  // 인증오류 상태값
  const [authError, setAuthError] = useState(false);
  // 아이프레임 부모로부터 받은 메시지(Error)
  const [iframeErrorData, setIframeErrorData] = useState(null);

  useEffect(()=> {
    // 이벤트 들었을 떄, 실행
    const exec = (e) => {
      // 인증 로딩창
      let _iframeData = e;
      // let data = {stdId: "", clsId: 5678} // 테스트
      if(_iframeData.data.stdId && _iframeData.data.clsId) {
        setAuthError(false);
        // setIframeData({stdId: 2, clsId: 1029957}) // 테스트
        setIframeData({stdId: _iframeData.data.stdId, clsId: _iframeData.data.clsId});
        console.log("LCMS 고유정보 확인");
      } 
      if ((_iframeData.data.type === "webpackWarnings")) {
        setIframeErrorData(_iframeData.data);
      }
    }

    window.addEventListener('message', exec);
    // webpackWarning 외에 다른 메시지가 들어왔을 때, 조건에 추가
    if(iframeErrorData?.type === "webpackWarnings") {
      if(!(iframeData.stdId && iframeData.clsId)) {
        setAuthError(true);
      } else {
        setAuthError(false);
      }
    } else {
      setAuthError(false);
    }

    return() => {
      window.removeEventListener('message', exec);
    };
    }, [iframeData, iframeErrorData])
  // ... ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장

  // ★ 기능 1_클래스에 학습자들 정보 조회

  // 화면에 표시할 데이터
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    if(iframeData.clsId)
    {
      axios.get(`https://clova-practice.codingbiz.creverse.com/api/practice/class/${iframeData.clsId}?page=0&size=30`)
      .then((res)=>{
        const tmpData = [];
        const files = res.data.items;
        files?.forEach((file) => {
          tmpData.push({
            chatbotName: file.chatbotName,
            title: file.chatbotTitle,
            chatbotIcon: file.emojiFilePath,
            chatbotPurpose: file.chatbotPurpose,
            // pageURL: `http://localhost:3000/#/chatbot/landing/${file.classId}/${file.memberId}`,
            pageURL: `https://clova-practice.codingbiz.creverse.com/#/chatbot/landing/${file.classId}/${file.memberId}`,
          })
        });
        setData(tmpData);
        setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 설정
      })
      .catch((error)=>{
        console.log(error)
        setLoading(false); // 데이터 로딩이 완료되면 loading 상태를 false로 설정
      })
    }
  },[iframeData])
  // ... ★ 기능 1_클래스에 학습자들 정보 조회

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
    {
      // loading ? 
      !loading ? 
      (
        <Modal
        open={loading}
        footer={null}
        title="로딩 중..."
        width={120}
        closable={false}
      >
        <Spin style={{ marginLeft: 25 }} />
      </Modal>
      ) :
      authError ? (
        <ErrorPage />
      ) :
      <div
        style={{
          width: 980,
          display: "flex",
        }}
      >
        <div>
          <div
            style={{ fontSize: 22, fontWeight: 700, position: "relative" }}
          >
            <div style={{ marginLeft: 7, zIndex: 1 }}>
              친구들의 홈페이지 확인 후 의견 나누기
            </div>
            <div
              style={{
                position: "absolute",
                backgroundColor: "rgba(38, 198, 218, 0.3)",
                width: 395,
                height: 8,
                top: 18,
                zIndex: 0,
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{width: 900, marginTop: 20 }}>
              {
                data.length === 0
                ?
                <div style={{textAlign: "center", color: "gray"}}>표시할 친구들의 챗봇 페이지가 없습니다.</div>
                :
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <div style={{ width: 60, height: 60, fontSize: 36, textAlign: "center" }}>{item.chatbotIcon}</div>
                        }
                        title={<a href={item.pageURL} target='_blank' rel="noopener noreferrer">[{item.chatbotName}] {item.title}</a>}
                        description={item.chatbotPurpose}
                      />
                    </List.Item>
                  )}
                />

              }
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

export default LcmsLandingPageListAuth;