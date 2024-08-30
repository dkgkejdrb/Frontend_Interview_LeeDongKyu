// 기능 1. url 파라미터로 clsId, stdId 받아와 학생이 셋팅한 페이지 구성값 조회하여 (1) 로컬상태값, (2) 전역상태값 각각 저장 <- 70번 라인에서 개발해야 함
// 기능 2. 로컬상태값의 테마에 맞게 컴퍼넌트(BlackWhite, BlueHouse, DeepForest 등) 렌더링
// 기능 3. 전역상태값은 테마에 맞는 페이지를 구성하기 위한 구성값으로 사용
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import BlackWhite from './LandingTheme/BlackWhite';
import BlueHouse from './LandingTheme/BlueHouse';
import DeepForest from "./LandingTheme/DeepForest";
import { useDispatch } from 'react-redux';
import landingPageSettingSlice from "../../app/landingPageSettingSlice";

const LandingDetail = () => {
  // id <- clsId, subId <- stdId 
  const clsId = useParams().id;
  const subId = useParams().subId;
  
  // ##############################################################################
  // stdId & clsId로 서버에 저장된 랜딩페이지 세팅 정보 불러오기
  // 나중에 작업해야 함.
  // ★ 백이 개발되는대로, 통신에서 응답받은 결과 전역 상태로 저장해야함
  // 지역상태값, 테마에 맞게 렌더링하는 용도
  const [theme, setTheme] = useState(null);
  const dispatch = useDispatch();
  // dispatch(landingPageSettingSlice.actions.setLandingPageSetting(testData)) // 전역상태값
  // ★ 기능 1_학습데이터 조회
  useEffect(()=>{
    // 랜딩페이지 첫 진입 시, uid 정보 받아오기

    let uidURL = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${clsId}/member/${subId}`; 
      axios.get(uidURL)
      .then((res)=>{
        const practiceUid = res.data.practiceUid;

        const getURL = `https://clova-practice.codingbiz.creverse.com/api/practice?uid=${practiceUid}`; 
        axios.get(getURL)
        .then((res)=>{
          const data = res.data;
          
          setTheme(data.landingPage.themeColor)
          dispatch(landingPageSettingSlice.actions.setLandingPageSetting(data)) // 전역상태값
        })
        .catch((error)=>{
          console.log(error)
        })
      })
      .catch((error)=>{
        console.log(error)
      })
    })

  

  // ##############################################################################
  
  // 로딩
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  return (
    <>
    {
      theme ?
        theme === "blackWhite" 
        ? <BlackWhite />
        : theme === "blueHouse" ?
        <BlueHouse />
        : theme === "sand" ?
        <DeepForest />
        : <>페이지를 찾을 수 없습니다.</>
      :<></>
    }
    </>
  );
}

export default LandingDetail;