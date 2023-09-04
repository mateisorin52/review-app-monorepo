/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { mainQueryClient } from '../providers/QueryClient';
import AppNavigator from './Navigators/AppNavigator';

export const App = () => {
  return (
    <QueryClientProvider client={mainQueryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
};

export default App;
