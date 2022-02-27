import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import type { IPost } from "lib/db/models";

import type { NextPage } from "next";

import { Post } from "containers/Post";

const PostPage: NextPage = () => {
	const [userPosts, setUserPosts] = useState<IPost[]>([]);
	const [error, setError] = useState<string | undefined>();

	const router = useRouter();
	const { user } = router.query;

	const handleError = async (error_: Response) => {
		const json = await error_.json();
		setError(json.message);
	};

	useEffect(() => {
		fetch(`/api/find/${user}`)
			.then((response) => {
				if (response.status == 200) return response.json();
				else handleError(response);
			})
			.then((data?: IPost[]) => {
				if (data) setUserPosts(data);
			});
	}, [user]);

	if (!userPosts) {
		return <p>Loading...</p>;
	}

	if (error) {
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
					<Post key={index} data={post} />
				))}
			</ul>
		</div>
	);
};

export default PostPage;
