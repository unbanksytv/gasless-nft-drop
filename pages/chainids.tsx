import '../styles/globals.css';
import { ThirdwebProvider } from '@3rdweb/react';
import type { AppProps } from 'next/app';

const ChainIDs = ({ Component, pageProps }: AppProps) => {
  const supportedChainIds = [4];
  const connectors = {
    injected: {},
    walletconnect: {},
    walletlink: {
      appName: 'Photo Labs - demo',
      url: 'https://livethelife.tv',
      darkMode: false,
    },
  };

  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default ChainIDs;
