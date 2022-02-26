import { IPost } from "lib/db/models";
import styles from "./index.module.scss";
import Image from "next/image";

export const Post = ({ data: post }: { data: IPost }) => {
	return (
		<div className={styles.post}>
			<p>A dish of {post.user}</p>
			<h2>{post.title}</h2>
			<p>{post.description}</p>
			<Image
				src={post.imageRawPath}
				height={300}
				width={300}
				alt={post.description}
			/>
		</div>
	);
};
