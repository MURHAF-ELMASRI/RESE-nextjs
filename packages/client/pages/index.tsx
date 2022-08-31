import { useMemo, useState } from "react";

interface Props {
  pitch: [{ _id: string; name: string }];
}

export default function Home(props: Props) {
  console.log(props);

  //TODO: get user from redux

  const [user, setUser] = useState();
  const isLoggedIn = useMemo(() => !!user, [user]);
  const isPlayer = useMemo(
    () => isLoggedIn /*  &&!!user.type === "player",*/,
    [isLoggedIn]
  );

  // if (!isLoggedIn) {
  //   return <UnSignedUser />;
  // }
  if (isPlayer) {
    return <div>player</div>;
  }
  return <div>manger</div>;
}

export async function getServerSideProps() {
  return {
    props: {
      pitch: [
        { _id: "hi", name: "hid" },
        { _id: "hello", name: "o" },
      ],
    },
  };
}
