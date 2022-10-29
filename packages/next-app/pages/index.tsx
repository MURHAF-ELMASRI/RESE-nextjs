import { Icon } from "@iconify/react";
import ButtonBase from "@material-ui/core/ButtonBase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import query from '@rese/database/query/query';
import { InferGetServerSidePropsType } from "next";
import { useRouter } from 'next/router';
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToggle } from "react-use";
import { useAppSelector } from "src/hooks/useAppSelector";
import Filter from "../components/Filter";
import PitchListItem from "../components/PitchListItem";


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


export const getServerSideProps = async () => {
  const pitches = await query.getPitches()
  return {
    props:{pitches:pitches}
  }
}



export default function Home({pitches}:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const classes = useStyle();
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useDispatch();
  const {push} = useRouter();


  const [isFilterOpen, toggleFilter] = useToggle(false);

  useEffect(() => {    
      console.log("updated")
  }, [dispatch]);

  const handleClickPitches = useCallback(() => {
    push("/pitches");
  }, [push]);

  const handleFilter = useCallback((filteredDate: any) => {
    console.log(filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    push("/login");
  }, [push]);

  return (
    <div className={classes.container}>

        <Filter
          allPitches={pitches}
          isOpen={isFilterOpen}
          onClose={() => toggleFilter(false)}
          onFilter={handleFilter}
        />

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

      {pitches?.map((e) => (
        <ButtonBase key={e._id} className={classes.iconButton}>
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
