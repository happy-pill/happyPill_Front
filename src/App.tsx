import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import useLoginedStore from './stores/loginedStore';

const App = () => {
  const queryClient = new QueryClient();

  //NOTE 메인페이지에서 로그인 처리 작업 시 해당 로직 수정 필요합니다.
  useEffect(() => {
    useLoginedStore.getState().setLoadined(null);
    // TODO 새로고침 시 isLogined true로 변경 작업 필요
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
