import { useSession, signIn, signOut } from "next-auth/react";

import { Avatar, Button } from "antd";

export const Header = () => {
  const { data: session } = useSession();

  const styles = {
    display: "flex",
    justifyContent: "flex-end",
  };

  if (session) {
    return (
      <div style={styles}>
        <Button onClick={() => signOut()}>Sign out</Button>
        Hello {session.user.name}!
        <Avatar src={session.user.image} />
      </div>
    );
  }

  return (
    <div style={styles}>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
};
