import { useSession } from "next-auth/react";

import { Button } from "antd";
import { Styles } from "./types.d";

const Home = () => {
  const { data: session } = useSession();

  const style: Styles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  if (!session) {
    return <div style={style}>Sign in to see your profile!</div>;
  }

  return (
    <div style={style}>
      Hello fellow new user!
      <Button href="/post">Post!</Button>
    </div>
  );
};

export default Home;
