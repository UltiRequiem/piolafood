import { useSession } from "next-auth/react";
import Link from "next/link";

import Image from "next/image";

import { Styles } from "./types.d";

import { IPost } from "../lib/db/models";
import { useEffect, useState } from "react";

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
			{(data && (
				<div style={style}>
					Hello fellow {data.user?.name ?? "new"} user!
					<Link href="/post">Post!</Link>
				</div>
			)) ?? <div style={style}>Sign in to see your profile!</div>}

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
		</>
	);
};

export default Home;
