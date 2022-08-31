import { useMemo, useState } from "react";
import { Provider } from "react-redux";
import { useAppSelector } from "../src/hooks/useAppSelector";
import { store } from "../state/store";
interface Props {
  pitch: [{ _id: string; name: string }];
}

function Test() {
  const data = useAppSelector((state) => state.ui);

  console.log(data);

  return <div>Test Test</div>;
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

  return (
    <Provider store={store}>
      <div>manger</div>
      <Test />
    </Provider>
  );
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       pitch: [
//         { _id: "hi", name: "hid" },
//         { _id: "hello", name: "o" },
//       ],
//     },
//   };
// }
