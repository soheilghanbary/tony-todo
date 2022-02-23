import type { AppProps } from "next/app";
import "styles/app.scss";
import "public/fonts/font.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "layouts/layout";
import { ThemeProvider } from "next-themes";
import { RecoilRoot } from "recoil";
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default appWithTranslation(MyApp);
