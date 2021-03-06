import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

// import { Store } from "react-notifications-component";

import Link from "next/link";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import { toBase64 } from "lib/others";
import { Styles } from "./types";

const style: Styles = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
};

const Post: NextPage = () => {
	const { data } = useSession();
	const router = useRouter();
	const { register, handleSubmit } = useForm();

	const onSubmit = async (formData: {
		imageFood: File[];
		title: string;
		description: string;
	}) => {
		const image: File = formData.imageFood[0];

		const fileType = image.type.split("/")[1];

		const imageData = await toBase64(image);

		const response = await fetch("/api/post", {
			method: "POST",
			body: JSON.stringify({
				title: formData.title,
				description: formData.description,
				imageData,
				imageDataFileType: fileType,
			}),
		});

		const dataResponse = await response.json();

		if (dataResponse.imagePath) {
			await navigator.clipboard.writeText(dataResponse.imagePath);

			// Store.addNotification({
			// 	title: "Copied to clipboard",
			// 	message: "Image path copied to clipboard",
			// 	insert: "top",
			// 	container: "top-right",
			// 	// animationIn: ["animate__animated", "animate__fadeIn"],
			// 	// animationOut: ["animate__animated", "animate__fadeOut"],
			// 	// dismiss: {
			// 		// duration: 5000,
			// 		// onScreen: true,
			// 	// },
			// });

			router.push(`/${data?.user?.email}`);
		}
	};

	if (!data) {
		return (
			<div style={style}>
				<p>You must login to see this page</p>
				<Link href="/login">Home</Link>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit as any)} style={style}>
			<label>
				Title
				<input required {...register("title")} />
			</label>

			<label>
				Description
				<input required {...register("description")} />
			</label>

			<label>
				Image Food
				<input
					required
					type="file"
					accept="image/*"
					{...register("imageFood")}
				/>
			</label>

			<button>Submit</button>
		</form>
	);
};

export default Post;
