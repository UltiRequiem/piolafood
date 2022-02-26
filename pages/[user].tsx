import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Image from "next/image";

import { IPost } from "../lib/db/models";

const Post = () => {
	const [userPosts, setUserPosts] = useState<IPost[]>([]);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();
	const { user } = router.query;

	const handleError = async (err: Response) => {
		const json = await err.json();
		setError(json.message);

		return undefined;
	};

	useEffect(() => {
		fetch(`/api/find/${user}`)
			.then((res) => {
				if (res.status == 200) return res.json();
				else return handleError(res);
			})
			.then((data?: IPost[]) => {
				if (typeof data !== "undefined") setUserPosts(data);
			});
	}, [user]);

	if (!userPosts) {
		return <p>Loading...</p>;
	}

	if (error !== null) {
		return <p>Error loading user: {error}</p>;
	}

	if (userPosts.length === 0) {
		return <p>No posts found</p>;
	}

	return (
		<div>
			<h1>{user} posts</h1>
			<ul>
				{userPosts.map((post, index) => (
					<li key={index}>
						<h2>{post.title}</h2>
						<p>{post.description}</p>

						<Image
							width={200}
							src={post.imageRawPath}
							alt={`${post.title} is ${post.description}`}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Post;
