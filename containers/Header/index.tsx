import { useSession, signIn, signOut } from "next-auth/react";

import styles from "./index.module.scss";

export const Header = () => {
	const { data: session } = useSession();

	if (
		typeof session !== "undefined" &&
		session !== null &&
		typeof session.user !== "undefined"
	) {
		return (
			<div className={styles.header}>
				<h1 className={styles.title}>Piolafood</h1>
				<button className={styles.btn} onClick={() => signOut()}>
					Sign out
				</button>
			</div>
		);
	}

	return (
		<div style={styles}>
			<button onClick={() => signIn()}>Sign in</button>
		</div>
	);
};
