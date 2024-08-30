import { useState, useEffect } from "react";

const GetAuthCheck = () => {
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
      let _iframeData = e;
      if(_iframeData.data.stdId && _iframeData.data.clsId) {
        setAuthError(false);
        // ★ TEST
        // setIframeData({stdId: 15, clsId: 1029957})
        setIframeData({stdId: _iframeData.data.stdId, clsId: _iframeData.data.clsId}); // 실제 서비스시 이걸로 변경
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
  // ★ 기능 0_LCMS 고유정보 수신, iframeData.stdId/iframeData.clsId 로 저장
    
    return {authError, iframeData};
}

export default GetAuthCheck;