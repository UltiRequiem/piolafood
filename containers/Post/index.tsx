import { IPost } from "lib/db/models";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

export const Post = ({ data: post }: { data: IPost }) => {
	return (
		<div className={styles.post}>
			<p className={styles.author}>
				By{" "}
				<span className={styles.user}>
					<Link href={"/" + post.user}>{post.user}</Link>
				</span>
			</p>

			<div className={styles.img_box}>
				<Image
					src={post.imageRawPath}
					height={300}
					width={300}
					alt={post.description}
					className={styles.img}
				/>
				<h1 className={styles.title}>{post.title}</h1>
				<p className={styles.description}>{post.description}</p>
				<p className={styles.end}>
					{post.tags.map((x) => (
						<span key={x} className={styles.tag}>
							#{x}{" "}
						</span>
					))}
				</p>
			</div>
		</div>
	);
};
