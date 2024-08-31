// Feature 1: Retrieve the page settings configured by the student using the clsId and stdId from the URL parameters, and store them in both (1) local state and (2) global state (to be developed at line 70)
// Feature 2: Render components (e.g., BlackWhite, BlueHouse, DeepForest, etc.) according to the theme of the local state
// Feature 3: Use the global state values as configuration settings for constructing the page according to the theme
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import BlackWhite from './LandingTheme/BlackWhite';
import BlueHouse from './LandingTheme/BlueHouse';
import DeepForest from "./LandingTheme/DeepForest";
import { useDispatch } from 'react-redux';
import landingPageSettingSlice from "../../store/slices/landingPageSettingSlice";

const LandingPageLoader = () => {
  // id <- clsId, subId <- stdId 
  const clsId = useParams().id;
  const subId = useParams().subId;

  // Get the settings for chatbot landing page via stdId & clsId
  const [theme, setTheme] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let uidURL = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${clsId}/member/${subId}`;
    axios.get(uidURL)
      .then((res) => {
        const practiceUid = res.data.practiceUid;

        const getURL = `https://clova-practice.codingbiz.creverse.com/api/practice?uid=${practiceUid}`;
        axios.get(getURL)
          .then((res) => {
            const data = res.data;

            setTheme(data.landingPage.themeColor)
            dispatch(landingPageSettingSlice.actions.setLandingPageSetting(data))
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  })
  // eslint-disable-next-line

  return (
    <main>
      {
        theme ?
          theme === "blackWhite"
            ? <BlackWhite />
            : theme === "blueHouse" ?
              <BlueHouse />
              : theme === "sand" ?
                <DeepForest />
                : <>페이지를 찾을 수 없습니다.</>
          :
          <></>
      }
    </main>
  );
}

export default LandingPageLoader;