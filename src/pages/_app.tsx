import "@/styles/globals.css";

import { Provider } from "react-redux";

import store from "../redux/store";

import type { AppProps } from "next/app";

// import { setAssetPath as setCalciteComponentsAssetPath } from '@esri/calcite-components/dist/components';

// setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
