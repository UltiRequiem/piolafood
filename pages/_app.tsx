import { SessionProvider } from "next-auth/react";
import { Layout } from "antd";

import { Header, Footer } from "../containers";

import type { AppProps } from "next/app";

import "antd/dist/antd.css";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Layout.Header style={{ backgroundColor: "gray" }}>
          <Header />
        </Layout.Header>

        <Layout.Content>
          <Component {...pageProps} />
        </Layout.Content>

        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    </SessionProvider>
  );
}
