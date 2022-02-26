import { useSession } from "next-auth/react";
import Link from "next/link";

import { Styles } from "./types.d";

import { IPost } from "lib/db/models";
import { useEffect, useState } from "react";

import styles from "styles/home.module.scss";
import { Post } from "containers/Post";

const Home = () => {
	const { data } = useSession();
	const [post, setPost] = useState<IPost[]>();

	useEffect(() => {
		fetch("/api/allPosts")
			.then((res) => res.json())
			.then((data) => setPost(data));
	}, []);

	const style: Styles = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	};

	return (
		<div style={style}>
			{data && (
				<>
					<h1>Share it!</h1>
					<button className={styles.btn}>
						<Link href="/post">Post!</Link>
					</button>
				</>
			)}

			<h1>Latest Posts</h1>

			{post && post.map((post, index) => <Post key={index} data={post} />)}
		</div>
	);
};

export default Home;
