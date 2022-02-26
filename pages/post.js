import { useSession } from "next-auth/react";

import { Button } from "antd";

const Post = () => {
  const { data } = useSession();

  if (!data) {
    return (
      <>
        <p>You must login to see this page</p>
        <Button href="/login"> Home</Button>
      </>
    );
  }

  return <div>Work in Progress!</div>;
};

export default Post;
