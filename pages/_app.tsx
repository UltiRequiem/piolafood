import { SessionProvider } from "next-auth/react";

import { Header, Footer } from "../containers";

import type { AppProps } from "next/app";

import "../styles/globals.css";
import "react-notifications-component/dist/theme.css";

import { ReactNotifications } from "react-notifications-component";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<Header />
			<ReactNotifications />
			<Component {...pageProps} />
			<Footer />
		</SessionProvider>
	);
}
