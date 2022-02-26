import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import styles from "./header.module.scss";

export const Header = () => {
	const { data } = useSession();

	return (
		<div className={styles.header}>
			<Link href="/" passHref>
				<h1 className={styles.title}>Piolafood</h1>
			</Link>
			{data ? (
				<>
					<div className={styles.user}>
						<Image
							src={data.user!.image as string}
							alt="Profile picture"
							width={40}
							height={40}
							className={styles.img}
						></Image>

						<div className={styles.username}>
							<Link href={"/" + data.user!.email}>{data.user?.name}</Link>
						</div>
					</div>

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
