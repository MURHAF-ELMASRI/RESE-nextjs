import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import query from '@rese/database/query/query';
import IconButtonRese from 'components/IconButtonRese';
import TextFieldRese from 'components/TextFieldRese';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { makeStyles } from 'tss-react/mui';
import Filter from '../components/Filter';
import PitchListItem from '../components/PitchListItem';

export const getServerSideProps = async () => {
  const pitches = await query.getPitches();
  return {
    props: {
      pitches: pitches,
    },
  };
};

export default function Home({
  pitches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = useStyle();
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const [isFilterOpen, toggleFilter] = useToggle(false);

  useEffect(() => {
    console.log('updated');
  }, [dispatch]);

  const handleClickPitches = useCallback(() => {
    push('/pitches');
  }, [push]);

  const handleFilter = useCallback((filteredDate: any) => {
    console.log(filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    push('/login');
  }, [push]);

  const search = useCallback((filteredDate: any) => {
    console.log(filteredDate);
    setSearchInput(filteredDate);
  }, []);

  return (
    <div className={classes.container}>
      <Filter
        allPitches={pitches}
        isOpen={isFilterOpen}
        onClose={() => toggleFilter(false)}
        onFilter={handleFilter}
      />

      <div className={classes.header}>
        <Typography className={classes.pitches} onClick={handleClickPitches}>
          Pitches
        </Typography>

        <IconButtonRese icon="bi:filter" onClick={() => toggleFilter(true)} />
        <IconButtonRese icon="mdi:login" onClick={handleSignupPage} />
      </div>

      <div className={classes.main}>
        <Paper className={classes.pitchesList} elevation={2}>
          <div className={classes.searchContainer}>
            <TextFieldRese
              name="search"
              onChange={search}
              title={'search'}
              value={searchInput}
              variant="outlined"
              className={classes.search}
            />
          </div>
          <Typography className={classes.listTitle}>Halı Sahalar</Typography>
          {pitches?.map((e) => (
            <PitchListItem data={e} key={e._id} />
          ))}
        </Paper>
        <Paper className={classes.pitchInfo} elevation={2}>
          <Typography className={classes.listTitle}>
            Select Pitch to display
          </Typography>
        </Paper>
      </div>
    </div>
  );
}

const useStyle = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    boxShadow: theme.shadows[1],
    alignItems: 'center',
    padding: '16px 24px',
    gap: 16,
  },

  searchContainer: {
    padding: 8,
    marginRight: 'auto',
    width: '100%',
  },
  main: {
    padding: 24,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 64,
  },
  pitches: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  pitchesList: {
    maxWidth: 464,
    width: '100%',
  },
  pitchInfo: {
    width: '100%',
  },

  listTitle: {
    fontSize: 24,
    padding: 16,
  },
  search: {
    width: '100%',
  },
}));
