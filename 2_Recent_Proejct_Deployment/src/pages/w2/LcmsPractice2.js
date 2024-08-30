// 프론트 prototype_0.1.1
import { Menu, Button, Input, Select, InputNumber, Slider, Space, Tag, Spin, Image } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// import copyIcon from '../../assets/copy.png';
// import Guide0 from '../../assets/Guide0.png';
// import Guide4 from '../../assets/Guide4.png';
// import Guide5 from '../../assets/Guide5.png';
// import Guide6 from '../../assets/Guide6.png';
// import Guide7 from '../../assets/Guide7.png';
// import Guide8 from '../../assets/Guide8.png';
// import topK from '../../assets/topK.png';
// import topP from '../../assets/topP.png';
// import maxTokensImage from '../../assets/maxTokens.png';

const { TextArea } = Input;

const dataArray = [
    // 분류 1 - 감정 0
    {}, 
    // 분류 2 - 병원 진료과 연결 1
    {},
    // 대화 1 - 지식백과형 만능박사 챗봇 2
    {},
    // 대화 2 - 사용자 데이터 기반 커스텀 챗봇 3
    {},
    // 질답 1 - 책 독서 확인 질문 4
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"책 설명과 관련하여 독서 확인 질문을 생성하십시오.\n\n설명: 이 책은 환경 생태의 문제를 자극하고, 건강한 환경 의식을 일깨워 주는 그림책입니다. 어느 날 바닷속을 헤엄치던 꼬마 물고기는 어딘가 다르게 생긴 이상한 물고기를 발견합니다. 말 없이 고개만 까딱이는 이상한 물고기가 자신의 생명을 위협하는 플라스틱 쓰레기라는 사실을 알리 없는 꼬마 물고기는 가족을 찾아 주기 위해 함께 길을 떠납니다. 그 과정에서 아무렇지 않은 듯 플라스틱 면봉을 꼬리로 감싼 해마와 그물에 다리가 엉킨 문어 그리고 비닐봉지를 입에 물고 있는 거북을 만나게 됩니다. 우리가 손쉽게 쓰고 버린 플라스틱과 비닐봉지로 인해 고통받는 바다 생물들의 모습을 아주 덤덤하게 표현했습니다. 단순히 환경 오염과 관련된 정보를 제공하고, 환경 보호를 위한 구체적인 실천을 요구하는 이야기가 아닙니다. 우리로 인해 달라진 바다 생태의 모습을 인지하고, 바다를 보호하는 것이 곧 우리의 삶을 지키는 것임을 깨닫게 합니다. \n질문: 도대체 바닷속에 무슨 일이 일어난 걸까요?\n \n###\n\n설명: 이 책은 낯선 세계에 오게 된 한 소녀의 이야기로 시작됩니다. 가족, 친구들과 떨어져 낯선 나라로 이민을 온 소녀는 외롭고 불안합니다. 좋은 이모와 삼촌이 있지만, 여전히 자신을 둘러싼 낯선 도시, 낯선 언어, 낯선 사람들이 차갑게만 느껴지지요. 새로운 친구를 사귀고도 싶지만 어떻게 해야할 지 모르는 소녀는 조용히 방 안에서 창밖을 바라볼 뿐입니다. 이런 소녀에게 이모는 옛이야기를 하나 들려줍니다. 이모가 들려준 이야기는 어떤 내용이었을까요? 소녀는 과연 낯선 새 나라에서 잘 지낼 수 있을까요?","maxTokens":50,"temperature":0.8,"repeatPenalty":5,"stopBefore":["###\n","설명:","질문:"],"start":"\n질문:","restart":"\n###\n설명:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 질답 2 - MBTI 백과사전 5
    {},
    // 요약 1 - 영화 줄거리 요약 6
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"영화 줄거리를 한 줄로 요약합니다.\n\n줄거리: \"미나리는 어디서든 잘 자라\" 낯선 미국, 아칸소로 떠나온 한국 가족. 가족들에게 뭔가 해내는 걸 보여주고 싶은 아빠 '제이콥'(스티븐 연)은 자신만의 농장을 가꾸기 시작하고 엄마 '모니카'(한예리)도 다시 일자리를 찾는다. 아직 어린 아이들을 위해 ‘모니카’의 엄마 ‘순자’(윤여정)가 함께 살기로 하고 가방 가득 고춧가루, 멸치, 한약 그리고 미나리씨를 담은 할머니가 도착한다. 의젓한 큰딸 '앤'(노엘 케이트 조)과 장난꾸러기 막내아들 '데이빗'(앨런 김)은 여느 그랜마같지 않은 할머니가 영- 못마땅한데… 함께 있다면, 새로 시작할 수 있다는 희망으로 하루하루 뿌리 내리며 살아가는 어느 가족의 아주 특별한 여정이 시작된다!\n한 줄 요약: 미국 아칸소로 떠나온 한국 가족이 새로 시작할 수 있다는 희망으로 하루하루 뿌리 내리며 살아가는 이야기입니다.\n###\n\n줄거리: 한때는 WBC 웰터급 동양 챔피언이었지만 지금은 오갈 데 없어진 한물간 전직 복서 '조하'(이병헌). 우연히 17년 만에 헤어진 엄마 '인숙'(윤여정)과 재회하고, 숙식을 해결하기 위해 따라간 집에서 듣지도 보지도 못했던 뜻밖의 동생 '진태'(박정민)와 마주한다. 난생처음 봤는데… 동생이라고?! 라면 끓이기, 게임도 최고로 잘하지만 무엇보다 피아노에 천재적 재능을 지닌 서번트증후군 진태. 조하는 입만 열면 \"네~\" 타령인 심상치 않은 동생을 보자 한숨부터 나온다. 하지만 캐나다로 가기 위한 경비를 마련하기 전까지만 꾹 참기로 결심한 조하는 결코 만만치 않은 불편한 동거생활을 하기 시작하는데… 살아온 곳도, 잘하는 일도, 좋아하는 것도 다른 두 형제가 만났다!","maxTokens":100,"temperature":0.7,"repeatPenalty":7,"stopBefore":["###\n","줄거리:","한 줄 요약:"],"start":"\n한 줄 요약:","restart":"\n###\n줄거리","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 요약 2 - 뉴스 요약 7
    {

    },
    // 변환 1 - 맞춤법 교정 8
    {"engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"text":"입력한 문장을 사투리로 변환합니다.\n\n문장: 너는 무슨 말을 하는거니?\n사투리: 니 머라카노\n###\n문장: 너 왜 이러는데\n사투리: 너 와이카노\n###\n문장: 너 밥 먹었니?","maxTokens":150,"temperature":0.3,"repeatPenalty":9,"stopBefore":["###\n","문장:","사투리:"],"start":"\n사투리:","restart":"\n###\n문장:","includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    // 변환 2 - 문체 변환(사투리, 사극 톤, 캐릭터 말투 등) 9
    {}
  ]

const items = [
  {
    label: "요약",
    key: "요약",
  },
  {
    label: "질문/답변",
    key: "질문/답변",
  },
  {
    label: "변환",
    key: "변환",
  },
];

const LcmsPractice2 = () => {
  // esc 키를 눌렀을 때, 모든 Question 마크 이미지 숨김
  useEffect(()=> {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        setClickedQuestionStateArray([false, false, false, false, false, false, false , false, false]);
      }
    }
    window.addEventListener("keydown", escKeyModalClose);
    return () => window.removeEventListener("keydown", escKeyModalClose);
  }, []);

  // ★ 기능1_실행하기
  // 로딩 상태값 (실행하기를 누르면, true / 실행종료가 되면, false)
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    // text가 없는 경우, errorCode 1
    if (!text) {
      alert("텍스트가 없으면, 실행할 수 없습니다.")
      return;
    }

  // 불러오기 시, ↵ 기호 모양이 포함된 화면의 값(tags, inputValue2, inputValue3)을 \n 으로 전부 변경
  let _tags = []
  tags.forEach((_tag) => {
    let __tag = _tag.replaceAll('↵', '\n');
    _tags.push(__tag);
  });
  const _inputValue2 = inputValue2.replaceAll('↵', '\n');
  const _inputValue3 = inputValue3.replaceAll('↵', '\n');

  const data = {
      "engine": engine,
      "topP": topPValue,
      "topK": topKValue,
      "text": text,
      "maxTokens": maxTokens,
      "temperature": temperature,
      "repeatPenalty": repetitionPenalty,
      "stopBefore": _tags,
      "start": _inputValue2,
      "restart": _inputValue3,
      "includeTokens": true,
      "includeAiFilters": true,
      "includeProbs": false
  };

  // 실행하기가 진행되는 동안 로딩 상태
  setLoading(true);
  console.log(data);

  // setOutputTokens
  axios.post(engine, data, {
    headers: {
        "Content-Type": 'application/json',
    }
  })
  .then((res) => {
      setText(res.data.result.text);
      setOutputTokens(res.data.result.outputText);
      // loading 상태 초기화
      setLoading(false);
  })
  .catch((error) => {
      console.log(error)
      // loading 상태 초기화
      setLoading(false);
  })}
  // ... 기능1_실행하기


  // ★ 기능2_파라미터
  // 클릭했을 때, classname 변경 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedStateArray, setClickedStateArray] = useState([false, false, false, false, false, false, false , false, false]); 
  // 파라미터 옆 물음표 버튼 클릭했을 때, 그림 보이기, 숨기기 상태 배열 ([엔진, TopP, TopK, Max tokens, Temperature, Repitition penalty, Stop, 결괏값앞, 결괏값뒤])
  const [clickedQuestionStateArray, setClickedQuestionStateArray] = useState([false, false, false, false, false, false, false , false, false]);

  // 학습엔진 스테이트, 이벤트
  const [engine, setEngine] = useState("/testapp/v1/completions/LK-B");
  const onChangeEngine = (e) => {
    setEngine(e);
  }

  // text 스테이트, 이벤트
  const [text, setText] = useState("");
  const onChangeText = (e) => {
    setText(e.target.value);
  }

  // topP 스테이트, 이벤트
  const [topPValue, setTopPValue] = useState(0.8);
  const onChangeTopP = (v) => {
    if (!v) { console.log("null") }
    typeof v === "object"
    ? 
      !v 
      ? 
        setTopPValue(0)
      :
        setTopPValue(v[0])
    : setTopPValue(v)
    setClickedStateArray([false, true, false, false, false, false, false, false, false])
  }

  // topK 스테이트, 이벤트
  const [topKValue, setTopKValue] = useState(0);
  const onChangeTopK = (v) => {
    typeof v === "object" 
    ? 
      !v 
      ? 
        setTopKValue(0)
      :
        setTopKValue(v[0])
    : setTopKValue(v)
    setClickedStateArray([false, false, true, false, false, false, false, false, false])
  }

  // maxTokens 스테이트, 이벤트
  const [maxTokens, setMaxTokens] = useState(100);
  const onChangeMaxTokens = (v) => {
    typeof v === "object"
    ? 
      !v 
      ? 
        setMaxTokens(0)
      :
        setMaxTokens(v[0])
    : setMaxTokens(v)
    setClickedStateArray([false, false, false, true, false, false, false, false, false])
  }

  // temperature 스테이트, 이벤트
  const [temperature, setTemperature] = useState(0.5);
  const onChangeTemperature = (v) => {
    typeof v === "object"
    ? 
      !v 
      ? 
        setTemperature(0)
      :
        setTemperature(v[0])
    : setTemperature(v)
    setClickedStateArray([false, false, false, false, true, false, false, false, false])
  }

  // repetitionPenalty 스테이트, 이벤트
  const [repetitionPenalty, setRepetitionPenalty] = useState(5);
  const onChangeRepetitionPenalty = (v) => {
    typeof v === "object"
    ? 
      !v 
      ? 
        setRepetitionPenalty(0)
      :
        setRepetitionPenalty(v[0])
    : setRepetitionPenalty(v)
    setClickedStateArray([false, false, false, false, false, true, false, false, false])
  }

  // 화면에 보여지는 tags
  const [tags, setTags] = useState([]);
  // 서버로 전송되는 tags
  const [tagsSend, setTagsSend] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectionStart1, setSelectionStart1] = useState(0);
  // tab 키 클릭 시, 정지키워드에 포커스
  const inputRef = useRef(null);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    setTagsSend(newTags);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, true, false, false])
  };

  // 추가
  const [tabPressed, setTabPressed] = useState(false);

  const handleInputConfirm = () => {
    // input 값이 있을 때에만 포커스
    if (inputValue) {
      inputRef.current.input.focus();
    }
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const inputValueSend = inputValue.replace(/↵/g, '\n');
      setTags([...tags, inputValue]);
      // 수정
      setTagsSend([...tagsSend, inputValueSend]);
    } 
    setInputValue('');
  };

  useEffect(() => {
    if (tabPressed) {
      handleInputConfirm();
      setTabPressed(false);
    }
  // eslint-disable-next-line
  }, [tabPressed])

  const onPressAfter = (e) => {
    if(e.code === "Enter") {
    e.target.selectionStart = selectionStart1 + 1;
    e.target.selectionEnd = e.target.selectionStart;
  }};

  const onPressBefore = (e) => {
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectionStart1(e.target.selectionEnd);
      let slicedBeforeWords = inputValue.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue.slice(e.target.selectionEnd);
      setInputValue(slicedBeforeWords + '↵' + slicedAfterWords);
    }

    // 추가
    if(e.code === "Tab") {
      e.preventDefault();
      setTabPressed(!tabPressed);
    }  
  };

  // 결괏값앞텍스트추가(inject start text)
  const [inputValue2, setInputValue2] = useState('');
  const [selectionStart2, setSelectionStart2] = useState(0);
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, false, true, false])
  };
  const onPressAfter2 = (e) => {
    if(e.code === "Enter") {
    e.target.selectionStart = selectionStart2 + 1;
    e.target.selectionEnd = e.target.selectionStart;
  }};
  const onPressBefore2 = (e) => {
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectionStart2(e.target.selectionEnd);
      let slicedBeforeWords = inputValue2.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue2.slice(e.target.selectionEnd);
      setInputValue2(slicedBeforeWords + '↵' + slicedAfterWords);
    }};

  // 결괏값뒤텍스트추가(inject start text)
  const [inputValue3, setInputValue3] = useState('');
  const [selectionStart3, setSelectionStart3] = useState(0);
  const handleInputChange3 = (e) => {
    setInputValue3(e.target.value);
    setClickedStateArray([false, false, false, false, false, false, false, false, true])
  };
  const onPressAfter3 = (e) => {
    if(e.code === "Enter") {
      e.target.selectionStart = selectionStart3 + 1;
      e.target.selectionEnd = e.target.selectionStart;
  }};
  const onPressBefore3 = (e) => {
    if(e.code === "Enter" && e.nativeEvent.isComposing === false) {
      setSelectionStart3(e.target.selectionEnd);
      let slicedBeforeWords = inputValue3.slice(0, e.target.selectionEnd);
      let slicedAfterWords = inputValue3.slice(e.target.selectionEnd);
      setInputValue3(slicedBeforeWords + '↵' + slicedAfterWords);
  }};
  // ... 기능2_파라미터

  // ★ 기능 8_콘솔창 출력 메시지
  const [outputTokens, setOutputTokens] = useState(null);
  // ... 기능 8_콘솔창 출력 메시지

    // 데이터 세트 클릭 상단메뉴
    const [current, setCurrent] = useState('요약');
    const onClick = (e) => {
      setCurrent(e.key);
    };

      // 텍스트아레아에서 ctrl + c 눌렀을 때, dataArray 인덱스값을 넘김
  const [id, setId] = useState('');
  // 복사하기위해 텍스트아레아 드래그시 id 넘기는 이벤트 함수
  const onClickCapture = (e) => {
    const _id = e.target.id;
    setId(_id);
  }

    // 복사하기 버튼 클릭 시, id 넘기는 이벤트 함수
    const onClickCaptureBtn = (e) => {
      const id = e.target.id;
      setEngine(dataArray[id].engine);
      setText(dataArray[id].text);
      setTopPValue(dataArray[id].topP);
      setTopKValue(dataArray[id].topK);
      setMaxTokens(dataArray[id].maxTokens);
      setTemperature(dataArray[id].temperature);
      setRepetitionPenalty(dataArray[id].repeatPenalty);

      // \n을 ↵로 변경 후, set
      const _tags = [];
      const __tags = dataArray[id].stopBefore;
      __tags.forEach((tag) => {
        const _tag = tag.replaceAll("\n", "↵");
        _tags.push(_tag);
      });
      setTags(_tags);

      if (dataArray[id].start || dataArray[id].start !== "") {
        const value = dataArray[id].start.replaceAll("\n", "↵");
        setInputValue2(value);
      } else {
        setInputValue2(dataArray[id].start);
      }
      if (dataArray[id].restart || dataArray[id].restart !== "") {
        const value = dataArray[id].restart.replaceAll("\n", "↵");
        setInputValue3(value);
      } else {
        setInputValue3(dataArray[id].restart);
      }
    }

        // ctrl + c or ctrl + v 이벤트 감지
        useEffect(() => {
          const handleKeyDown = (event) => {
            const code = event.which || event.keyCode;

            let charCode = String.fromCharCode(code).toLowerCase();
            if ((event.ctrlKey || event.metaKey) && charCode === "v") {
              event.preventDefault();
              setEngine(dataArray[id].engine);
              setText(dataArray[id].text);
              setTopPValue(dataArray[id].topP);
              setTopKValue(dataArray[id].topK);
              setMaxTokens(dataArray[id].maxTokens);
              setTemperature(dataArray[id].temperature);
              setRepetitionPenalty(dataArray[id].repeatPenalty);

              // \n을 ↵로 변경 후, set
              const _tags = [];
              const __tags = dataArray[id].stopBefore;
              __tags.forEach((tag) => {
                const _tag = tag.replaceAll('\n', '↵');
                _tags.push(_tag);
              })
              setTags(_tags);
          
              if(dataArray[id].start || dataArray[id].start !== "") {
                const value = dataArray[id].start.replaceAll('\n', '↵');
                setInputValue2(value);
              } else {
                setInputValue2(dataArray[id].start);
              }
              if(dataArray[id].restart || dataArray[id].restart !== "") {
                const value = dataArray[id].restart.replaceAll('\n', '↵');
                setInputValue3(value);
              } else {
                setInputValue3(dataArray[id].restart);
              }
            }
          };

          window.addEventListener("keydown", handleKeyDown);

          return () => window.removeEventListener("keydown", handleKeyDown);
        }, [id]);
  

  return (
    <>
      {/* 데이타세트, 챗봇학습기 라벨 */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            paddingTop: 20,
            width: 980,
            display: "flex"
          }}
        >
          <div style={{ marginLeft: 24 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              사전 학습 데이터 세트
            </div>
          </div>
          <div style={{ marginLeft: 120 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              챗봇 학습기
            </div>
          </div>
          <div style={{ marginLeft: 365 }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
              }}
            >
              파라미터
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
          overflowX: "hidden"
        }}
      >
        {/* ★ 왼쪽 데이터셋트 영역 */}
        <div
          className="dataset"
          style={{
            width: 280,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Menu
            style={{ width: "100%" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          {current === "질문/답변" ? (
            <>
              {/* 데이타셋-질답 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 분류 - 1세트 */}
                <div style={{ display: "flex", minHeight: 500 }}>
                  <div
                    style={{ width: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                  >
                    <p style={{ fontSize: 14 }}>1세트</p>
                    <Button
                    id="4"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 36,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="4"
                      alt=""
                      // src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                  </div>
                  <TextArea
                    id="4"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none", fontSize: 12 }}
                    value={dataArray[4].text}
                    rows={21}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </div>
              </div>
              {/* 데이타셋-질답 끝 */}
            </>
          ) : current === "요약" ? (
            <>
              {/* 데이타셋-요약 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 요약 - 1세트 */}
                <div style={{ display: "flex", minHeight: 500 }}>
                  <div
                    style={{ width: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                  >
                    <p style={{ fontSize: 14 }}>1세트</p>
                    <Button
                    id="6"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 36,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="6"
                      alt=""
                      // src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                  </Button>
                  </div>
                  <TextArea
                    id="6"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none", fontSize: 12 }}
                    value={dataArray[6].text}
                    rows={21}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </div>
              </div>
              {/* 데이타셋-요약 끝 */}
            </>
          ) : current === "변환" ? (
            <>
              {/* 데이타셋-변환 시작 */}
              <div
                className="tableOutline"
                style={{ marginTop: 20, width: "100%", fontSize: "1.1rem" }}
              >
                {/* 변환 - 1세트 */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{ width: 60, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                  >
                    <p style={{ fontSize: 14 }}>1세트</p>
                    <Button
                    id="8"
                    onClickCapture={onClickCaptureBtn}
                    style={{
                      width: 36,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      id="8"
                      alt=""
                      // src={copyIcon}
                      style={{ width: 20 }}
                      onClickCapture={onClickCaptureBtn}
                    ></img>
                    </Button>
                  </div>
                  <TextArea
                    id="8"
                    onClickCapture={onClickCapture}
                    bordered={false}
                    style={{ marginLeft: 5, resize: "none", fontSize: 12 }}
                    value={dataArray[8].text}
                    rows={10}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  />
                </div>
              </div>
              {/* 데이타셋-변환 끝 */}
            </>
          ) : (
            <></>
          )}
        </div>

        {/* ★ 중간 영역 */}
        <div
          style={{
            width: 420,
            height: "570px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // 왼쪽 데이타셋트 칸 띄우기
            marginLeft: 10,
            borderLeft: "1px solid #e7e7e7",
          }}
        >
          {/* 입출력창 */}
          <div
            style={{
              width: "100%",
              minHeight: 300,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f1f1f1",
              // 안쪽 title, text 간격 띄우기
              marginLeft: 10,
            }}
          >
            <div name="text" style={{ width: "100%" }}>
              {loading ? (
                <div
                  style={{
                    width: 420,
                    height: 300,
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <></>
              )}
              <TextArea
                value={text}
                placeholder="완료하려면 왼쪽 텍스트를 복사하고 붙여넣기 후, 실행하기 버튼을 눌러주세요."
                rows={10}
                bordered={false}
                maxLength={3800}
                onChange={(e) => onChangeText(e)}
                style={{ height: "300px", resize: "none", fontSize: 14 }}
              />
            </div>
          </div>
          {/* 툴바 메뉴 */}
          <div
            style={{
              width: "100%",
              height: "50px",
              paddingLeft: 10,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button type="primary" onClick={onSubmit} loading={loading}>
              실행하기
            </Button>
          </div>
          <div
            className="console"
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "#1e232e",
              marginLeft: 10,
              paddingTop: "10px",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: 420,
                  height: 200,
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
            ) : (
              <></>
            )}
            <div
              style={{ fontSize: "14px", color: "white", marginLeft: "11px" }}
            >
              결과 화면
            </div>
            <TextArea
              bordered={false}
              className="outputText"
              style={{ color: "white", height: "160px", resize: "none", fontSize: 14 }}
              value={outputTokens}
            />
          </div>
        </div>
        {/* ★ 오른쪽 파라미터 영역 */}
        <div
          className="navigation"
          style={{
            width: "200px",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            // 왼쪽 네비게이션 칸 띄우기
            marginLeft: 30,
            borderLeft: "1px solid #e7e7e7",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: 60,
            }}
          >
            {/* 저장하기 클릭시, 입력되는 파일제목 */}
            <div style={{ width: 230, marginBottom: "20px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  marginBottom: "5px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[0] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14 }}
                  >학습엔진(Engine)
                </div>
              </div>
              <Select
                value={engine}
                options={[
                  {
                    value: "/testapp/v1/completions/LK-B",
                    label: "LK-B",
                  },
                  {
                    value: "/testapp/v1/completions/LK-C",
                    label: "LK-C",
                  },
                  {
                    value: "/testapp/v1/completions/LK-D2",
                    label: "LK-D2",
                  },
                  {
                    value: "/testapp/v1/completions/LE-C",
                    label: "LE-C",
                  },
                ]}
                style={{
                  width: 150,
                }}
                onChange={onChangeEngine}
                onClick={()=>{
                  setClickedStateArray([true, false, false, false, false, false, false, false, false])
                }}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}  >
                <QuestionCircleOutlined
                  className={clickedQuestionStateArray[0] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[0] = !newArray[0];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[0]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide0} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide0} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[1] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, letterSpacing: "-1px" }}
                >
                  누적확률조절
                  <br />
                  (Top P)
                </div>
                <InputNumber
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={onChangeTopP}
                  value={topPValue}
                  onClick={()=>{setClickedStateArray([false, true, false, false, false, false, false, false, false])}}
                  style={{ width: 60 }}
                />
              </div>
              <Slider
                range
                min={0}
                max={1}
                step={0.1}
                onChange={onChangeTopP}
                value={topPValue}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <QuestionCircleOutlined                   
                  className={clickedQuestionStateArray[1] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[1] = !newArray[1];
                    setClickedQuestionStateArray(newArray);  
                  }}  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[1]
                  ?
                  <Image preview={false} width={500} 
                    // src={topP} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={topP} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[2] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14 }}
                >상위순위조절<br />(TopK)</div>
                <InputNumber
                  min={0}
                  max={128}
                  step={1}
                  onChange={onChangeTopK}
                  value={topKValue}
                  onClick={()=>{setClickedStateArray([false, false, true, false, false, false, false, false, false])}}
                  style={{ width: 60 }}
                />
              </div>
              <Slider
                range
                min={0}
                max={128}
                step={1}
                onChange={onChangeTopK}
                value={topKValue}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[2] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[2] = !newArray[2];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[2]
                  ?
                  <Image preview={false} width={500} 
                    // src={topK} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={topK} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[3] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, letterSpacing: "-2px" }}
                >출력문장수조절<br />(Max tokens)</div>
                <InputNumber
                  min={0}
                  max={600}
                  step={1}
                  onChange={onChangeMaxTokens}
                  value={maxTokens}
                  onClick={()=>{setClickedStateArray([false, false, false, true, false, false, false, false, false])}}
                  style={{ width: 60 }}
                />
              </div>
              <Slider
                range
                min={0}
                max={600}
                step={10}
                onChange={onChangeMaxTokens}
                value={maxTokens}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[3] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[3] = !newArray[3];
                    setClickedQuestionStateArray(newArray);  
                  }}                 
                  style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[3]
                  ?
                  <Image preview={false} width={500} 
                    // src={maxTokensImage} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={maxTokensImage} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[4] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, width: 98, letterSpacing: "-0.5px" }}
                >다양성조절(Temperature)</div>
                <InputNumber
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={onChangeTemperature}
                  value={temperature}
                  onClick={()=>{setClickedStateArray([false, false, false, false, true, false, false, false, false])}}
                  style={{ width: 60 }}
                />
              </div>
              <Slider
                range
                min={0}
                max={1}
                step={0.1}
                onChange={onChangeTemperature}
                value={temperature}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[4] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[4] = !newArray[4];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                style={{position: "relative"}}/>
                {
                  clickedQuestionStateArray[4]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide4} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide4} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={clickedStateArray[5] ? "clicked" : "unclicked"}
                  style={{ fontSize: 14, letterSpacing: "-1.5px", width: 180 }}
                >중복표현억제조절 (Repetition penalty)</div>
                <InputNumber
                  min={0}
                  max={10}
                  step={1}
                  onChange={onChangeRepetitionPenalty}
                  value={repetitionPenalty}
                  onClick={()=>{setClickedStateArray([false, false, false, false, false, true, false, false, false])}}
                  style={{ width: 75 }}
                />
              </div>
              <Slider
                range
                min={0}
                max={10}
                step={1}
                onChange={onChangeRepetitionPenalty}
                value={repetitionPenalty}
              />
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[5] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[5] = !newArray[5];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                />
                {
                  clickedQuestionStateArray[5]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide5} 
                    style={{ position: "absolute", top: -10, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide5} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex", position: "relative" }}>
              <div className="left" style={{ width: 150 }}>
              <div 
              className={clickedStateArray[6] ? "clicked" : "unclicked"}
              style={{ marginBottom: "10px", width: 150, fontSize: 14 }}>
                정지문자(Stop sequences)
              </div>
              <Space size={[0, 8]} wrap>
                <Space size={[0, 8]} wrap>
                  {/* 인풋창 */}
                  {/* <Input
                    className="stopSequence"
                    type="text"
                    size="small"
                    placeholder="키워드 입력 후 Tab"
                    style={{ width: 150, height: 30 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    ref={inputRef}
                    onKeyDown={onPressAfter}
                    onKeyDownCapture={onPressBefore}
                    onClick={()=>{setClickedStateArray([false, false, false, false, false, false, true, false, false])}}
                  /> */}
                  <Input
                    className="stopSequence"
                    type="text"
                    size="small"
                    placeholder="키워드 입력 후 Tab"
                    style={{ width: 150, height: 30 }}
                    value={inputValue}
                    onChange={handleInputChange}
                    // onBlur={handleInputConfirm}
                    ref={inputRef}
                    onKeyDown={onPressAfter}
                    onKeyDownCapture={onPressBefore}
                    onClick={()=>{setClickedStateArray([false, false, false, false, false, false, true, false, false])}}
                  />
                </Space>
                <div style={{ width: 150, minHeight: "36px" }}>
                  {/* 태그창 */}
                  {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable
                        style={{
                          userSelect: "none",
                        }}
                        onClose={() => handleClose(tag)}
                      >
                        <span>
                          {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </span>
                      </Tag>
                    );
                    return tagElem;
                  })}
                </div>
              </Space>
              </div>
              <div className="right" style={{ marginLeft: 11, display: "flex", alignItems: "center" }}>
                <QuestionCircleOutlined 
                  className={clickedQuestionStateArray[6] ? "clicked" : "unclicked"}
                  onClick={()=>{                
                    let newArray = [...clickedQuestionStateArray];
                    newArray[6] = !newArray[6];
                    setClickedQuestionStateArray(newArray);  
                  }} 
                  style={{position: "absolute", top: 25}}/>
                  {
                  clickedQuestionStateArray[6]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide6} 
                    style={{ position: "absolute", top: -140, right: 505, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide6} 
                    style={{ display: "none", position: "absolute", right: 505, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left" style={{ width: 150 }}>
              <div 
              className={clickedStateArray[7] ? "clicked" : "unclicked"}
              style={{ marginBottom: "10px", letterSpacing: "-0.5px", fontSize: 14 }}>
                시작문자(Inject start text)
              </div>
              <Input
                style={{ width: 150, height: "30px" }}
                onChange={handleInputChange2}
                value={inputValue2}
                onKeyDown={onPressAfter2}
                onKeyDownCapture={onPressBefore2}
                onClick={()=>{setClickedStateArray([false, false, false, false, false, false, false, true, false])}}
              ></Input>
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  <QuestionCircleOutlined 
                    className={clickedQuestionStateArray[7] ? "clicked" : "unclicked"}
                    onClick={()=>{                
                      let newArray = [...clickedQuestionStateArray];
                      newArray[7] = !newArray[7];
                      setClickedQuestionStateArray(newArray);  
                    }} 
                  tyle={{position: "relative"}}/>
                  {
                  clickedQuestionStateArray[7]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide7} 
                    style={{ position: "absolute", top: -120, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide7} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>

            <div style={{ width: 230, marginBottom: "10px", display: "flex" }}>
              <div className="left">
              <div 
              className={clickedStateArray[8] ? "clicked" : "unclicked"}
              style={{ marginBottom: "10px", letterSpacing: "-0.5px", fontSize: 14 }}>
                끝문자(Inject restart text)
              </div>
              <Input
                style={{ width: 150, height: "30px" }}
                onChange={handleInputChange3}
                value={inputValue3}
                onKeyDown={onPressAfter3}
                onKeyDownCapture={onPressBefore3}
                onClick={()=>{setClickedStateArray([false, false, false, false, false, false, false, false, true])}}
              ></Input>
              </div>
              <div className="right" style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  <QuestionCircleOutlined 
                    className={clickedQuestionStateArray[8] ? "clicked" : "unclicked"}
                    onClick={()=>{                
                      let newArray = [...clickedQuestionStateArray];
                      newArray[8] = !newArray[8];
                      setClickedQuestionStateArray(newArray);  
                    }} 
                  style={{position: "relative"}}/>
                  {
                  clickedQuestionStateArray[8]
                  ?
                  <Image preview={false} width={500} 
                    // src={Guide8} 
                    style={{ position: "absolute", top: -120, right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                  :
                  <Image preview={false} 
                    // src={Guide8} 
                    style={{ display: "none", position: "absolute", right: 520, borderRadius: 8, border: "1px solid #d9d9d9", zIndex: 1 }} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LcmsPractice2;