import exitIcon from '@/assets/icons/exit.png'
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getImgUrl } from '@/utils/getImgUrl';
import completeIcon from '@/assets/icons/complete.png'
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function TeamMatchNotificationModal() {
  const [notification, setNotification] = useState<{ title: string | undefined, body: string | undefined }>({ title: '', body: '' });
  const [matchId, setMatchId] = useState<number>(0);
  const [memberId, setMemberId] = useState<number>(0);
  const [teamId, setTeamId] = useState<number>(0);
  const [teamName, setTeamName] = useState<string>('');
  const [tier, setTier] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => {
    return state.userId.id;
  });
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCZSaWxtPJKnVTUtkmIDxIMCreCEr0ScbA",
    authDomain: "fir-fdef7.firebaseapp.com",
    databaseURL: "https://fir-fdef7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fir-fdef7",
    storageBucket: "fir-fdef7.appspot.com",
    messagingSenderId: "808423483984",
    appId: "1:808423483984:web:abdb73b3b73219b3b1bf55",
    measurementId: "G-S20W3SX3K1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  async function requestPermission() {
    console.log('Requesting permission...');
    await Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    })
  }
  requestPermission()

  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);
  // Add the public key generated from the console here.
  getToken(messaging, { vapidKey: "BNQmQhy0t5IXHTfP3RhasoNL_no_HYBNDPnygCfciW5c3nopkkWkqxasbcesQ5DzISkX5JvheAIOrNaeeBrQ2ho" }).then((currentToken) => {
    if (currentToken && userId) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("current Token : ", currentToken)
      console.log(userId)
      axios.post(SERVER_URL + "/token/register", null, { params: { memberId: userId, token: currentToken } }).catch(() => console.log("zzzzzzzz", currentToken))
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...s
  });

  window.fcmForegroundOnFlutterApp = (data: any) => {
    data = JSON.parse(data)

    const matchData = data?.team1;
    const matchData2 = data?.team2;
    if (matchData.memberId === userId) {
      setMatchId(matchData.matchId);
      setMemberId(matchData.memberId);
      setTeamId(matchData.opTeamId);
      setTeamName(matchData.opTeamName);
      setTier(matchData.opTier);
    } else if (matchData2.memberId === userId) {
      setMatchId(matchData2.matchId);
      setMemberId(matchData2.memberId);
      setTeamId(matchData2.opTeamId);
      setTeamName(matchData2.opTeamName);
      setTier(matchData2.opTier);
    }
    console.log(matchData)

    setOpen(true);
  }

  // foreground
  onMessage(messaging, (payload) => {

    console.log('Message received(foregorund). ', payload);
    const matchData = payload && payload.data && JSON.parse(payload?.data?.team1);
    const matchData2 = payload && payload.data && JSON.parse(payload?.data?.team2);
    if (matchData.memberId === userId) {
      setMatchId(matchData.matchId);
      setMemberId(matchData.memberId);
      setTeamId(matchData.opTeamId);
      setTeamName(matchData.opTeamName);
      setTier(matchData.opTier);
    } else if (matchData2.memberId === userId) {
      setMatchId(matchData2.matchId);
      setMemberId(matchData2.memberId);
      setTeamId(matchData2.opTeamId);
      setTeamName(matchData2.opTeamName);
      setTier(matchData2.opTier);
    }
    console.log(matchData)

    setOpen(true);
    // ...
  });

  if (window.fluttFcmData) {
    console.log(window.fluttFcmData);
  }

  return (
    <div>
      {open ? <div className="absolute w-full h-full bottom-0 bg-black/50 z-20">
        <div className="w-[304px] h-[389px] absolute rounded-15 top-1/2 left-1/2 ml-[-152px] mt-[-194px] overflow-hidden">
          <img className="w-10 h-10 absolute top-16 right-16" src={exitIcon} onClick={() => setOpen(false)}></img>
          <div className="w-full h-134 flex flex-col justify-center items-center bg-green-300">
            <img className="w-40 h-40" src={completeIcon}></img>
            <div className="text-15 mt-18">매칭이 완료되었습니다</div>
          </div>
          <div className="w-full h-[255px] bg-white">
            <div className="w-full h-196 flex flex-col items-center">
              <img className="w-100 h-100 mt-19" src={getImgUrl('profiles/team', teamId)} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = getImgUrl('profiles/team', 'default_team')
              }}></img>
              <div className="text-15 mt-18">{teamName}</div>
              <div className="w-88 h-30 mt-5 flex justify-center items-center bg-yellow-200 rounded-10">{tier}</div>
            </div>
            <div className="w-full h-59">
              <div className="absolute bottom-17 right-13 text-16 text-blue-700" onClick={() => location.assign(`/team-match/join/${matchId}`)}>자세히 보기</div>
            </div>
          </div>
        </div>
      </div > : null

      }
    </div>

  )

}