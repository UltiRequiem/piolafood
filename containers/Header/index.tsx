import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import styles from "./index.module.scss";

export const Header = () => {
	const { data } = useSession();

	return (
		<div className={styles.header}>
			<Link href="/" passHref>
				<h1 className={styles.title}>Piolafood</h1>
			</Link>
			{data ? (
				<>
					<button className={styles.btn} onClick={() => signOut()}>
						Sign out
					</button>
				</>
			) : (
				<button className={styles.btn} onClick={() => signIn()}>
					Sign in
				</button>
			)}
		</div>
	);
};
