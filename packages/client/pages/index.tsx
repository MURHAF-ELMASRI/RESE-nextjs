import { useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { Provider } from "react-redux";
import { useAppSelector } from "../src/hooks/useAppSelector";
import { store } from "../state/store";
import { Icon } from "@iconify/react";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { PitchType } from "@rese/common/model/Pitch";
import axios, { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "react-use";
import Filter from "../components/Filter";
import PitchListItem from "../components/PitchListItem";
import { initializePitches } from "../state/Pitch/pitchSlice";
import { RootState } from "../state/store";
import { pageTransition } from "../util/const";

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

  if (!isLoggedIn) {
    return <UnSignedUser />;
  }

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

function UnSignedUser() {
  const classes = useStyle();
  const pitches = useSelector((state: RootState) => state.pitch.pitches);
  const dispatch = useDispatch();
  const {push} = useRouter();

  const [isFilterOpen, toggleFilter] = useToggle(false);

  useEffect(() => {
    axios
      //TODO: put all routes in object
      .get(`${process.env.REACT_APP_SERVER_URL}/pitches/`)
      .then(
        (response: AxiosResponse<{ pitches: PitchType[] }>) => response.data
      )
      .then((data) => {
        dispatch(initializePitches(data.pitches));
      })
      .catch((e) => {
        //TODO: show error to user using alert in mui
        console.log(e.message);
      });
  }, [dispatch]);

  const handleClickPitches = useCallback(() => {
    push("/pitches");
  }, [push]);

  const handleFilter = useCallback((filteredDate) => {
    console.log(filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    push("/login");
  }, [push]);

  return (
    <div className={classes.container}>

        {/* <Filter
          allPitches={pitches}
          isOpen={isFilterOpen}
          onClose={() => toggleFilter(false)}
          onFilter={handleFilter}
        /> */}

      <div className={classes.thumbnail} />

      <div className={classes.header}>
        <div className={classes.searchContainer}>
          <TextField
            name={"search"}
            onChange={handleSignupPage}
            label={"search"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon
                    className={classes.icon}
                    icon="mdi:magnify"
                    width={24}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <IconButton
          className={classes.iconContainer}
          onClick={handleClickPitches}
        >
          <Typography>Pitches</Typography>
        </IconButton>

        <IconButton
          className={classes.iconContainer}
          onClick={() => toggleFilter(true)}
        >
          <Icon className={classes.icon} icon="bi:filter" />
        </IconButton>

        <IconButton
          className={classes.iconContainer}
          onClick={handleSignupPage}
        >
          <Icon className={classes.icon} icon="mdi:login" />
        </IconButton>

      </div>

      {pitches?.map((e, idx) => (
        <ButtonBase key={idx} className={classes.iconButton}>
          <PitchListItem data={e} />
        </ButtonBase>
      ))}

    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
  },
  thumbnail: {
    width: "100%",
    height: 8,
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    display: "flex",
    width: "100%",
    boxShadow: theme.shadows[1],
  },
  search: {
    marginRight: "auto",
  },
  icon: {
    color: theme.palette.text.primary,
  },
  iconButton: {
    maxWidth: 464,
    justifyContent: "start",
  },
  iconContainer: {
    borderRadius: 8,
  },
  searchContainer: { padding: 8, marginRight: "auto" },
  
}));
