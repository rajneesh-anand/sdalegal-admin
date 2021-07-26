import React from "react";
import { Provider } from "next-auth/client";

import "assets/scss/style.scss";
import "assets/css/nextjs-material-dashboard.css?v=1.1.0";

const App = ({ Component, pageProps }) => {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Layout>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
};

export default App;
