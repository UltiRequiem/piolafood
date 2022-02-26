import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button, notification } from "antd";

import { toBase64 } from "../lib/others";
import { Styles } from "./types";

const style: Styles = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	height: "100vh",
};

const Post = () => {
	const { data } = useSession();
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: {
		imageFood: File[];
		title: string;
		description: string;
	}) => {
		const image: File = data.imageFood[0];

		const fileType = image.type.split("/")[1];

		const imageData = await toBase64(image);

		const response = await fetch("/api/post", {
			method: "POST",
			body: JSON.stringify({
				title: data.title,
				description: data.description,
				imageData,
				imageDataFileType: fileType,
			}),
		});

		const dataResponse = await response.json();

		if (dataResponse.imagePath) {
			await navigator.clipboard.writeText(dataResponse.imagePath);

			notification.success({
				message: "Copied to clipboard",
				description: "Image path copied to clipboard",
				placement: "bottomRight",
			});
		}

		console.log(dataResponse);
	};

	if (!data) {
		return (
			<div style={style}>
				<p>You must login to see this page</p>
				<Button href="/login"> Home</Button>
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
