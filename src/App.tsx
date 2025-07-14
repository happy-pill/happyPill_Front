import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import { setRefreshToAccessToken } from './utils/refreshToAccessToken';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    setRefreshToAccessToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
