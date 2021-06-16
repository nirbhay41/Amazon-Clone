import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '../app/store';
import { Provider as AuthProvider } from 'next-auth/client';
import '../styles/globals.css'
import { PersistGate } from 'redux-persist/lib/integration/react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
}