import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar } from "antd";

import { Button } from "../components";

export const Header = () => {
	const { data } = useSession();

	return (
		<div className="flex flex-row-reverse justify-between h-full">
			{data ? (
				<>
					<Button type="button" onClick={() => signOut()}>
						Sign out
					</Button>
					Hello {data?.user?.name}!
					<a href={`/${data?.user?.email}`}>
						<Avatar src={data?.user?.image} />
					</a>
				</>
			) : (
				<Button onClick={() => signIn()}>Sign in</Button>
			)}
		</div>
	);
};
