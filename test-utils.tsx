import { ChildrenProps } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { type RootState, configureAppStore } from '@/app/redux/store';

type AppRenderOption = Parameters<typeof render>[1] & {
  preloadedState?: DeepPartial<RootState>;
};

// eslint-disable-next-line import/prefer-default-export
export const appRender = (
  ui: JSX.Element,
  { preloadedState, ...options }: AppRenderOption = {},
) => {
  const AppProvider = ({ children }: ChildrenProps) => (
    <ReduxProvider store={configureAppStore(preloadedState)}>
      <ChakraProvider>{children}</ChakraProvider>
    </ReduxProvider>
  );

  return render(ui, { wrapper: AppProvider, ...options });
};
