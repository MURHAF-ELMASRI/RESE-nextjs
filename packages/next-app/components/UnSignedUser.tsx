import { useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from 'tss-react/mui';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PitchType } from '@rese/common/model/Pitch';
import axios, { AxiosResponse } from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/Router';
import { memo, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import queryQL from '../src/graphql/queryQL';
import { initializePitches } from '../state/Pitch/pitchSlice';
import { pageTransition } from '../util/const';
import Filter from './Filter';
import PitchListItem from '../pages/index/PitchListItem';

export default memo(UnSignedUser);

function UnSignedUser() {
  const { classes } = useStyles();
  const { loading, error, pitches } = useQuery(queryQL.query.pitch);

  const dispatch = useDispatch();
  const router = useRouter();

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
    router.push('/pitches');
  }, [router]);

  const handleFilter = useCallback((filteredDate) => {
    console.log(filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <motion.div className={classes.container} {...pageTransition}>
      <motion.div
        className={classes.filterContainer}
        transition={{ duration: 0.3 }}
        animate={{
          opacity: isFilterOpen ? 1 : 0,
          y: isFilterOpen ? 0 : -400,
        }}
      >
        <Filter
          allPitches={pitches}
          isOpen={isFilterOpen}
          onClose={() => toggleFilter(false)}
          onFilter={handleFilter}
        />
      </motion.div>

      <div className={classes.thumbnail} />
      <div className={classes.header}>
        <div className={classes.searchContainer}>
          <TextField
            name={'search'}
            onChange={handleSignupPage}
            label={'search'}
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
    </motion.div>
  );
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: 8,
    backgroundColor: theme.palette.primary.main,
  },
  header: {
    display: 'flex',
    width: '100%',
    boxShadow: theme.shadows[1],
  },
  search: {
    marginRight: 'auto',
  },
  icon: {
    color: theme.palette.text.primary,
  },
  iconButton: {
    maxWidth: 464,
    justifyContent: 'start',
  },
  iconContainer: {
    borderRadius: 8,
  },
  searchContainer: { padding: 8, marginRight: 'auto' },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: 3,
    zIndex: 99,
  },
}));
