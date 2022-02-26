import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  if (session) {
    return <div style={style}>Hello fellow new user!</div>;
  }

  return <div style={style}>Sign in to see your profile!</div>;
};

export default Home;
