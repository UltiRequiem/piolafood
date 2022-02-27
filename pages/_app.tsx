import { SessionProvider } from "next-auth/react";

import { Header, Footer } from "containers";

import type { AppProps } from "next/app";

import "../styles/globals.scss";
import "react-notifications-component/dist/theme.css";

import { ReactNotifications } from "react-notifications-component";

export default function App({
	Component,
	pageProps: { session, ...pageProperties },
}: AppProps) {
	return (
		<>
			<SessionProvider session={session}>
				<div
					style={{
						width: "100vw",
						height: "100%",
						color: "#D8E0FF",
					}}
				>
					<ReactNotifications />
					<Header />
					<Component {...pageProperties} />
					<Footer />
				</div>
			</SessionProvider>
		</>
	);
}
