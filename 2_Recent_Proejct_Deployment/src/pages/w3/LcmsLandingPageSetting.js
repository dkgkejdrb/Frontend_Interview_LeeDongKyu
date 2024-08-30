import { Button, Radio, Form, Input, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';
const { TextArea } = Input;

const testLearningDatas = [
    {"name":"맞춤법교정_홍길동","engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"title":"맞춤법교정","text":"입력한 문장을 틀린 문법이 올바르게 수정된 문장으로 변환합니다.\n\n###\n문장: 너랑 걔네들은 다르잖아. 너대로 하면되\n교정: 너랑 걔네들은 다르잖아. 너대로 하면 돼\n###\n문장: 이런식으로 행동하면 어떻게?\n교정: 이런 식으로 행동하면 어떡해?\n###\n\n문장: 이제 됬어요?\n","maxTokens":150,"temperature":0.3,"repeatPenalty":5,"start":"↵교정:","restart":"↵###↵문장:","stopBefore":["###↵","문장:","교정:"],"includeTokens":true,"includeAiFilters":true,"includeProbs":false},
    {"name":"감정분석_홍길동","engine":"/testapp/v1/completions/LK-B","topP":0.8,"topK":0,"title":"감정분석기","text":"이것은 문장 감정 분석기입니다.\n\n문장: \"기분 진짜 좋다\"\n감정: 긍정\n###\n문장: \"아오 진짜 짜증나게 하네\"\n감정: 부정\n###\n문장: \"이걸로 보내드릴게요\"\n감정: 중립\n\n###\n문장: \"좀 불편하지만, 이것도 나쁘진 않아요.\"\n감정: 중립\n\n\n###\n문장:","maxTokens":30,"temperature":0.5,"repeatPenalty":5,"start":"↵감정:","restart":"↵###↵문장:","stopBefore":["###↵","감정:","문장:"],"includeTokens":true,"includeAiFilters":true,"includeProbs":false}
]

const testData = 
    {
        "studentID": "abcd1234",
        "classID": "efgh1234",
        "pageURL": "http://localhost:3000/#/chatbot/landing/abcd1234"
    }

const imojiArray = [ "🐇", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦", "🦨","🦘","🦡","🐾","🦃","🐔","🐓","🐣","🐤","🐥","🐦","🐧","🕊","🦅","🦆","🦢","🦉","🦩","🦚","🐙","🐚","🐌","🦋","🐛","🐜","🐝","🐞","🦗","🕷","🕸","🦂","🦟","🦠","💐","🌸","💮","🏵","🌹","🥀","🌺","🌻","🌼","🌷","🌱","🌲","🌳","🍌","🍍","🥖","🥨","🥯","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🥙","🍣","🍤","🍥","🥮","🍡","🥟","🥠","🥡","🦀","🦞","🦐","🦑","🍮","🍯","🥤","🧃","🧉","🧊","🥢","🍽","🍴","🥄","🔪","🏺","🌍","🌎","🌏","🌐","🗺","🗾","🧭","🏔","🏫","🏬","🏭","🏯","🏰","💒","🗼","🗽","⛪","⛲","⛺","🌁","🌃","🏙","🌄","🌅","🌆","🌇","🌉","♨","🎠","🎡","🎢","💈","🚚","🚛","🚜","🏎","🏍","🛵","🦽","🦼","🛺","🚲","🛴","🛹","🚏","🛢","⛽","🚨","🛬"]

// 저장하기 버튼 클릭 시, form 제출
const onFinish = (data) => {
    // 유효성 검사
    if(!data.title) {window.alert("홈페이지 설정 > 타이틀을 작성해주세요."); return; }
    else if(!data.instruction) {window.alert("홈페이지 설정 > 설명 입력을 작성해주세요."); return; }
    else if(!data.mainBanner) {window.alert("홈페이지 설정 > 메인배너를 작성해주세요."); return; }
    else if(!data.chatbotName) {window.alert("챗봇 설정 > 챗봇 이름을 작성해주세요."); return; }
    else if(!data.chatbotSummary) {window.alert("챗봇 설정 > 챗봇 한줄소개를 작성해주세요."); return; }
    else if(!data.chatbotPurpose) {window.alert("챗봇 설정 > 챗봇 목적을 작성해주세요."); return; }
    else if(!data.chatbotGuide) {window.alert("챗봇 설정 > 챗봇 사용설명을 작성해주세요."); return; }
    else if(!data.chatbotEffect) {window.alert("챗봇 설정 > 챗봇 기대효과를 입력해주세요."); return; }
    else if(!data.chatbotWelcomeMessage) {window.alert("챗봇 설정 > 챗봇 환영 메시지를 입력해주세요."); return; }
    else if(!data.learningData) {window.alert("챗봇 설정 > 최종 학습 데이터를 입력해주세요."); return; }

    window.alert("저장되었습니다.")

    console.log(data);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const LcmsLandingPageSettings = () => {


    return(
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 40 }}>
            <div
            style={{
                width: 980,
                display: "flex",
            }}>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                <div className="hompageSettings">
                    <div style={{ fontSize: 22, fontWeight: 700, position: "relative" }}>
                        <div style={{ marginLeft: 7, zIndex: 1 }}>홈페이지 설정</div>
                        <div style={{ position: "absolute", backgroundColor: "rgba(38, 198, 218, 0.3)", width: 150, height: 8, top: 18, zIndex: 0 }}></div>
                    </div>
                    <div style={{width: 900, height: 105, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>템플릿 선택<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="theme" initialValue="blackWhite">
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="blackWhite" style={{ fontSize: 18 }}>blackWhite</Radio>
                                        <Radio value="blueHouse" style={{ fontSize: 18 }}>blueHouse</Radio>
                                        <Radio value="greenLight" style={{ fontSize: 18 }}>greenLight</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>타이틀 입력<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="title">
                                <TextArea maxLength={30} rows={1} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>설명 입력<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="instruction">
                                <TextArea maxLength={100} rows={3} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, marginTop: 40, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>메인배너<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item
                                name="mainBanner"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                extra="(필수) 너비: 450px / 높이: 340px"
                                >
                                <Upload name="mainBanner" action="/upload.do" listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ marginTop: 60, fontSize: 22, fontWeight: 700, position: "relative" }}>
                        <div style={{ marginLeft: 7, zIndex: 1 }}>챗봇 설정</div>
                        <div style={{ position: "absolute", backgroundColor: "rgba(38, 198, 218, 0.3)", width: 106, height: 8, top: 18, zIndex: 0 }}></div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 이름<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotName">
                                <TextArea maxLength={12} rows={1} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 한줄소개<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotSummary">
                                <TextArea maxLength={30} rows={1} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 목적<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotPurpose">
                                <TextArea maxLength={100} rows={3} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20, marginTop: 40}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 사용설명<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotGuide">
                                <TextArea maxLength={100} rows={3} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20, marginTop: 40}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 기대효과<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotEffect">
                                <TextArea maxLength={30} rows={1} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 40, fontSize: 18, display: "flex", padding: 20, marginTop: 20}}>
                        <div style={{width: 180, fontWeight: 600}}>챗봇 환영 메시지<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                            <Form.Item name="chatbotWelcomeMessage">
                                <TextArea maxLength={60} rows={3} style={{ resize: "none" }} showCount />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, height: 420, fontSize: 18, display: "flex", padding: 20, marginTop: 40}}>
                        <div style={{width: 180, height: 420, fontWeight: 600}}>챗봇 아이콘<span style={{color: "red"}}>*</span></div>
                        <div className='chatbotIconSettings' style={{width: 720, height: 420}}>
                            <Form.Item name="chatbotIcon" initialValue={imojiArray[0]}>
                                <Radio.Group buttonStyle='solid'>
                                    {
                                        imojiArray.map((imoji)=>(
                                            <Radio.Button key={uuid()} value={imoji} style={{ fontSize: 20 }} >{imoji}</Radio.Button>))
                                    } 
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{width: 900, minHeight: 40, fontSize: 18, display: "flex", padding: 20, marginTop: 10}}>
                        <div style={{width: 180, fontWeight: 600}}>최종 학습 데이터<span style={{color: "red"}}>*</span></div>
                        <div style={{width: 720 }}>
                        <Form.Item name="learningData">
                                <Radio.Group>
                                    <Space direction="vertical">
                                    {
                                        testLearningDatas.map((data)=>(
                                            <Radio key={uuid()} value={data} style={{ fontSize: 20 }} >{`${data.name} / ${data.title}`}</Radio>
                                        ))
                                    }
                                        {/* <Radio value="blackWhite" style={{ fontSize: 18 }}>blackWhite</Radio>
                                        <Radio value="blueHouse" style={{ fontSize: 18 }}>blueHouse</Radio>
                                        <Radio value="greenLight" style={{ fontSize: 18 }}>greenLight</Radio> */}
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: 20}}>
                <Button type="primary" htmlType="submit">
                    저장하기
                </Button>
                <Button onClick={()=>{
                    // 새탭 페이지이동
                    window.open(`/#/chatbot/landing/${testData.studentID}`, '_blank')
                    
                }} style={{ backgroundColor: "rgb(55, 193, 213)", color: "white", marginLeft: 10 }}>
                    미리보기
                </Button>
                {/* <Link to={`/chatbot/landing/${testData.studentID}`}>미리보기</Link> */}
                </div>
                </Form>
            </div>
        </div>
    )
}

export default LcmsLandingPageSettings;