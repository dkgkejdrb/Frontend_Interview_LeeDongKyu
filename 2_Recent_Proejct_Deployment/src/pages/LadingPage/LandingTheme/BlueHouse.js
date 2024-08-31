// landingPageSettingSlice 로부터 전역 상태값 가져와야 함
import { Space, Image, Button, Input } from 'antd';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import uuid from 'react-uuid';
import useDidMountEffect from '../../../hooks/useDidMountEffect';
import { useSelector } from 'react-redux';
import './BlueHouse.css'
// import mainBannerBHFrame from '../../../assets/mainBannerBHFrame.png';
// import dashedBH1 from '../../../assets/dashedBH1.png';
// import dashedBH2 from '../../../assets/dashedBH2.png'
// import sendIconBH from '../../../assets/sendIconBH.png';

// 채팅창에 일자 갖고 오기
// const date = new Date();
const getTime = () => {
  const date = new Date();
  const _hour = date.getHours();
  const _min = date.getMinutes();
  let res = "";
  let hour = "";
  let min = "";

  if (_hour < 13) {
    hour = `오전 ${_hour}시`;
  } else {
    if ((_hour - 12) < 10) {
      hour = `오후 0${(_hour - 12)}시`;
    } else {
      hour = `오후 ${_hour - 12}시`
    }
  }

  if (_min < 10) {
    min = `0${_min}분`
  } else {
    min = `${_min}분`
  }

  res = `${hour} ${min}`;
  return res;

}

const welcomeDate = getTime();

const BlueHouse = () => {
  // 통신 관련, 정식 서비스시 바꿔줘야 함
  // eslint-disable-next-line
  const TEST_SUBMIT_URL = "http://localhost:3005/questioningAnswering";

  const config = {
    "Content-Type": "application/json",
  };

  const landingPageSettingData = useSelector(state => {
    return state.landingPageSettingSlice.landingPageSetting;
  })

  // 로딩
  const [loading, setLoading] = useState(false);

  // 챗봇 로그(배열)
  const [logs, setLogs] = useState([]);
  // input 질문, 대화창 표시 아님
  const [_inputValue, _setInputValue] = useState("");
  // input 질문, 대화창 표시용
  const [inputValue, setInputValue] = useState("");
  // 학습데이터+input 질문
  const [chatText, setChatText] = useState("");
  // 전송버튼을 클릭하자마자 input창이 안보임
  const [inputShow, setInputShow] = useState(true);
  const inputChatText = (e) => {
    _setInputValue(e.target.value);
    setChatText(
      landingPageSettingData.practiceItem.text +
      landingPageSettingData.practiceItem.restart.replace(/↵/g, '\n') + // 수정1
      e.target.value
    );
  };

  const sendMessage = () => {
    if (!_inputValue) {
      return;
    }
    // 로딩
    setLoading(true);

    setInputValue(_inputValue);

    setInputShow(false);

    // ★ landingPageSettingData.learningData를 바로 던지며 안됨
    const learningData = landingPageSettingData.practiceItem;

    let __stopBefore = learningData["stopBefore"].split(','); // 수정1
    let _stopBefore = __stopBefore.map(item => item.replace(/↵/g, '\n')); // 수정1

    const data = {
      name: learningData.name,
      engine: learningData.engine,
      topP: learningData.topP,
      topK: learningData.topK,
      title: learningData.subject,
      // restart와 input창의 챗팅텍스트 결합하여 전송
      text: chatText,
      maxTokens: learningData.maxToken,
      temperature: learningData.temperature,
      repeatPenalty: learningData.repeatPenalty,
      start: learningData.start.replace(/↵/g, '\n'), // 수정1
      restart: learningData.restart.replace(/↵/g, '\n'), // 수정1
      stopBefore: _stopBefore, // 수정1
      includeTokens: true,
      includeAiFilters: true,
      includeProbs: false,
    }

    axios
      // .post(TEST_SUBMIT_URL, data, config)
      .post(learningData.engine, data, config)
      .then((res) => {
        // 출력 토큰 가공
        const _outputText = res.data.result.outputText.replace(
          learningData.start.replace(/↵/g, '\n'), // 수정1
          ""
        );
        const outputText = _outputText.replace(
          learningData.restart.replace(/↵/g, '\n'),  // 수정1
          ""
        );
        setLoading(false);
        setLogs([
          ...logs,
          {
            myMessage: _inputValue,
            chatBotMessage: outputText,
            date: getTime(),
          },
        ]);
        _setInputValue("");
        setInputShow(true)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        _setInputValue("");
        setInputShow(true)
      });
  };

  // 채팅 메시지 란에 스크롤 가장 아래로 내리기
  const messageEndRef = useRef(null);
  useDidMountEffect(() => {
    const scrollHeight = messageEndRef.current.scrollHeight;
    messageEndRef.current.scrollTop = scrollHeight;
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 채팅 입력창 클릭 시, 클래스네임 변경
  const [chatbotInputclicked, setChatbotInputclicked] = useState(false);
  const [chatbotInputClassname, setChatbotInputClassname] = useState("chatbotInputMessageBH");
  const chatbotInputClickHandler = () => {
    setChatbotInputclicked(true);
  }
  const chatbotInputBlurHandler = () => {
    setChatbotInputclicked(false);
  }

  useEffect(() => {
    if (chatbotInputclicked) {
      setChatbotInputClassname("chatbotInputMessageClickedBH");
    } else {
      setChatbotInputClassname("chatbotInputMessageBH");
    }
  }, [chatbotInputclicked])

  return (
    <div
      style={{
        overflowX: "hidden",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "NanumSquareNeo",
        backgroundColor: "#F1F6FF",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          justifyContent: "center",
          fontSize: 20,
          color: "#fff",
          height: 71,
          lineHeight: "64px",
          background: "linear-gradient(to right, #2858FF, #78B6FF)",
          fontFamily: "NanumSquareNeo",
          fontWeight: 700,
        }}
      >
        <div className="BHheader">여름방학특강 - AI챗봇 만들기 </div>
      </div>
      <Space
        direction="vertical"
        style={{
          backgroundColor: "#F1F6FF",
          lineHeight: "24px",
        }}
      >
        <div>
          <div
            style={{
              marginTop: 42,
              width: 980,
              minHeight: 120,
              color: "#000",
              backgroundColor: "#F1F6FF",
            }}
          >
            <div className="bannerContainer">
              <div className="BHupperContainer" style={{}}>
                <div className="_BHupperContainer">
                  <div className="BHpageSettings_title">
                    {landingPageSettingData.landingPage.title}
                  </div>
                  <div className="BHpageSettings_description">
                    {landingPageSettingData.landingPage.description}
                  </div>
                </div>
                <div className="BHmainBannerFrame">
                  <Image preview={false}
                  // src={mainBannerBHFrame}
                  ></Image>
                  <div className="_BHmainBanner">
                    <Image
                      preview={false}
                      src={
                        landingPageSettingData.landingPage.bannerImage.path
                      }
                    ></Image>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="BHchatbot">
                <div className="_BHchatbot" ref={messageEndRef}>
                  <div className="__BHchatbot">
                    <div
                      className="pageSettings.chatbotIcon"
                      style={{
                        width: 80,
                        height: 80,
                        fontSize: 59,
                        lineHeight: "initial",
                      }}
                    >
                      {landingPageSettingData.landingPage.chatbotIcon.name}
                    </div>
                    <div className="__BHchatbotUpper">
                      <div className="__BHchatbotUpperChatbotName">
                        <div>{`${landingPageSettingData.landingPage.chatbotName}`}</div>
                        <div>에게 문의하기</div>
                      </div>
                      <div
                        className="__BHchatbotUpperChatbotIntroduction"
                        style={{}}
                      >
                        {`${landingPageSettingData.landingPage.chatbotIntroduction}`}
                      </div>
                    </div>
                  </div>

                  <Image
                    className="BHdashed"
                    // src={dashedBH1}
                    preview={false}
                  ></Image>

                  {/* 환영메시지 */}
                  <div className="DialogueBoxBH" ref={messageEndRef}>
                    <div className="logDateBH">{welcomeDate}</div>
                    <div className="chatbotMessageBH">
                      {landingPageSettingData.landingPage.welcomeMessage}
                    </div>
                  </div>
                  {logs.length > 0 &&
                    logs.map((log) => (
                      <div key={uuid()}>
                        <div className="myMessageBoxBH">
                          <div className="logDateBH">{log.date}</div>
                          <div className="myMessageBH">{log.myMessage}</div>
                        </div>
                        <div className="DialogueBoxBH">
                          <div className="logDateBH">{log.date}</div>
                          <div className="chatbotMessageBH">
                            {log.chatBotMessage}
                          </div>
                        </div>
                      </div>
                    ))}

                  {loading ? (
                    inputValue && (
                      <div className="myMessageBoxBH">
                        <div className="logDateBH">{getTime()}</div>
                        <div className="myMessageBH">{inputValue}</div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                  {!loading ? (
                    <></>
                  ) : (
                    <>
                      <div className="DialogueBoxBH">
                        <div className="logDateBH">{getTime()}</div>
                        <div className="chatbotMessageBH">...</div>
                      </div>
                    </>
                  )}
                  {/* <div ref={messageEndRef}></div> */}

                  <div
                    // className='chatbotInputMessage'
                    className={chatbotInputClassname}
                    onClick={chatbotInputClickHandler}
                    onBlur={chatbotInputBlurHandler}
                  >
                    {inputShow ? (
                      <Input
                        className="_BHInput"
                        style={{ boxShadow: "none" }}
                        onChange={inputChatText}
                        value={_inputValue}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                      />
                    ) : (
                      <Input
                        className="_BHInput"
                        style={{ boxShadow: "none", backgroundColor: "white" }}
                        disabled
                      />
                    )}
                    <Button
                      loading={loading}
                      onClick={sendMessage}
                      style={{
                        borderRadius: 20,
                        width: 52,
                        height: 52,
                        border: "none",
                      }}
                      icon={<Image
                        // src={sendIconBH} 
                        preview={false} />}
                    ></Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="chatbotIntroductionBox"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="BHchatbotIntroduction">
                <div
                  style={{
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#076FE9",
                    }}
                  >
                    챗봇 이름
                  </div>
                  <div
                    className="pageSettings.chatbotName"
                    style={{
                      marginTop: 12,
                      width: 300,
                      fontWeight: 400,
                      fontSize: 16,
                    }}
                  >
                    {landingPageSettingData.landingPage.chatbotName}
                  </div>
                  <Image
                    className="BHdashed"
                    style={{ marginTop: 24 }}
                    preview={false}
                  // src={dashedBH2}
                  ></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 780,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#076FE9",
                    }}
                  >
                    챗봇 목적
                  </div>
                  <div className="BHpageSettings_chatbotPurpose">
                    {landingPageSettingData.landingPage.chatbotPurpose}
                  </div>
                  <Image
                    className="BHdashed"
                    style={{ marginTop: 24 }}
                    preview={false}
                  // src={dashedBH2}
                  ></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 780,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#076FE9",
                    }}
                  >
                    챗봇 기대효과
                  </div>
                  <div className="BHpageSettings_expectedEffect">
                    {landingPageSettingData.landingPage.expectedEffect}
                  </div>
                  <Image
                    className="BHdashed"
                    style={{ marginTop: 24 }}
                    preview={false}
                  // src={dashedBH2}
                  ></Image>
                </div>

                <div
                  style={{
                    marginTop: 24,
                    width: 430,
                    fontSize: 24,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#076FE9",
                    }}
                  >
                    챗봇 사용설명
                  </div>
                  <div className="BHpageSettings_chatbotDirections">
                    {landingPageSettingData.landingPage.chatbotDirections}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Space>
      <div className="BHfooter">
        <div style={{ width: 860 }}>
          Copyright © CREVERSE Inc. All right reserved.
        </div>
      </div>
    </div>
  );
}

export default BlueHouse;