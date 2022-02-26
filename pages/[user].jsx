import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { Image } from "antd";

const Post = () => {
	const [userPosts, setUserPosts] = useState([]);

	const router = useRouter();
	const { user } = router.query;

	const { data: session } = useSession();

	useEffect(() => {
		fetch(`/api/find/${user}`)
			.then((res) => res.json())
			.then((data) => setUserPosts(data));
	}, [user]);

	if (!session) {
		return <p>Sign in to see your profile!</p>;
	}

	if (!userPosts) {
		return <p>Loading...</p>;
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
