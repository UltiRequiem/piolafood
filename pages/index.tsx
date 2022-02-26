import { useSession } from "next-auth/react";
import Link from "next/link";

import Image from "next/image";

import { Styles } from "./types.d";

import { IPost } from "../lib/db/models";
import { useEffect, useState } from "react";

import styles from "../styles/home.module.scss";

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
		<>
			<div style={style}>
				{data && (
					<>
						<h1>Share it!</h1>

						<button className={styles.btn}>
							<Link href="/post">new post</Link>
						</button>
					</>
				)}

				<h1>Latest Posts</h1>

				{(post &&
					post.map((post, index) => (
						<div key={index}>
							<p> A dish of {post.user}</p>
							<h2>{post.title}</h2>
							<p>{post.description}</p>
							<Image
								src={post.imageRawPath}
								height={300}
								width={300}
								alt={post.description}
							/>
						</div>
					))) ?? <p>Loading...</p>}
			</div>
		</>
	);
};

export default Home;
