import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Button } from "antd";

import { toBase64 } from "../lib/others";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const Post = () => {
  const { data } = useSession();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    /** @type {File} */
    const image = data.imageFood[0];

    const imgData = await toBase64(image);

    console.log(imgData);
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
    <form onSubmit={handleSubmit(onSubmit)} style={style}>
      <label>
        Title
        <input required {...register("title")} />
      </label>

      <label>
        Description
        <input {...register("description")} />
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
