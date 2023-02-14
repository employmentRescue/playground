import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import store from './stores/store';
import './index.css';
import { UserDefaultPage, DefaultPage, StartDefaultPage } from './pages/DefaultPages';
import HomePage from './pages/home/HomePage';
import MatchPage from './pages/match/MatchPage';

import persistStore from 'redux-persist/es/persistStore';
import LoginPage from './pages/user/LoginPage';
import LoginRegistPage from './pages/user/LoginRegistPage';
import LoginFailPage from './pages/user/LoginFailPage';
import LoginSuccessPage from './pages/user/LoginSuccessPage';
import RegisterCompletePage from './pages/user/RegisterCompletePage';
import ChattingListPage from './pages/chatting/ChattingListPage';
import ChattingRoomPage from './pages/chatting/ChattingRoomPage';
import MatchDetailPage from './pages/match/MatchDetailPage';
import MatchRegisterPage from './pages/match/MatchRegisterPage';
import MenuListPage from './pages/menu/MenuListPage';
import ProfilePage from './pages/menu/profile/ProfilePage';
import RankPage from './pages/menu/RankPage';
import MatchListPage from './pages/menu/MatchListPage';
import MyTeamPage from './pages/menu/myTeam/MyTeamPage';
import MyTeamDetailPage from './pages/menu/myTeam/MyTeamDetailPage';
import TeamCreateDefaultPage from './pages/menu/teamCreate/TeamCreateDefaultPage';
import TeamMatchRegisterPage from './pages/teamMatch/TeamMatchRegisterPage';
import TeamMatchDetailPage from './pages/teamMatch/TeamMatchDeatilPage';
import TeamMatchGamePage from './pages/teamMatch/TeamMatchGamePage';
import TeamMatchPage from './pages/teamMatch/TeamMatchPage';
import StartPage from './pages/start/StartPage';

const container = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <StartDefaultPage />,
    children: [
      {
        path: '',
        element: <StartPage />,
      },
    ]
  },
  {
    path: '/',
    element: <DefaultPage />,
    children: [
      // 메인 페이지
      {
        path: 'home',
        element: <HomePage />,
      }
      ,
      // 매칭 페이지
      {
        path: 'match',
        element: <MatchPage />,
      },
      {
        path: 'match/detail/:matchId',
        element: <MatchDetailPage />, 
      },
      {
        path: 'match/register',
        element: <MatchRegisterPage />,
      },

      // 팀 매칭 페이지
      {
        path: 'team-match',
        element: <TeamMatchPage />
      },
      {
        path: 'team-match/register',
        element: <TeamMatchRegisterPage />
      },
      {
        path: 'team-match/detail/:teamMatchId',
        element: <TeamMatchDetailPage />
      },
      {
        path: 'team-match/join',
        element: <TeamMatchGamePage />
      },

      // 전체 메뉴(프로필, 통게, 매칭, 팀, 도움말)
      {
        path: 'menu/',
        element: <MenuListPage />,
      },
      {
        path: 'menu/profile',
        element: <ProfilePage />,
      },
      {
        path: 'menu/rank',
        element: <RankPage />,
      },
      {
        path: 'menu/match',
        element: <MatchListPage />,
      },
      {
        path: 'menu/team/create',
        element: <TeamCreateDefaultPage />,
      },
      {
        path: 'menu/team',
        element: <MyTeamPage />,
      },
      {
        path: 'menu/team/:teamId',
        element: <MyTeamDetailPage />,
      },

      // 채팅
      {
        path: 'chatting/',
        element: <ChattingListPage />,
      },
      {
        path: 'chatting/room/:roomId',
        element: <ChattingRoomPage />,
      },
    ]
  },
  {
    path: '/',
    element: <UserDefaultPage />,
    children: [
      {
        // '카카오 계정으로 로그인' 버튼이 있는 로그인 페이지
        path: 'login',
        element: <LoginPage />,
      },
      // 앱 계정이 없는 사용자에게 보여줄 회원가입 페이지
      {
        // 개인정보, 관심정보, 운동레벨 변경 탭
        path: 'login/regist',
        element: <LoginRegistPage />,
      },
      {
        // 로그인 실패 페이지
        path: 'login/fail',
        element: <LoginFailPage />,
      },
      {
        // 백엔드 서버에서 로그인 토큰까지 받아왔을 때 Redirect될 URL
        path: 'login/success',
        element: <LoginSuccessPage />,
      },
      {
        path: 'login/register/complete',
        element: <RegisterCompletePage />,
      },
    ],
  },

]);

createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
