import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonRese from 'components/ButtonRese';
import IconButtonRese from 'components/IconButtonRese';
import TextFieldRese from 'components/TextFieldRese';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { makeStyles } from 'tss-react/mui';
import Filter from '../components/Filter';
import PitchListItem from '../components/PitchListItem';
import { useUiContext } from './uiStore';
import { useUserContext } from './userStore';

export const getServerSideProps: GetServerSideProps<{
  pitches: any[];
}> = async () => {
  return {
    props: {
      pitches: [],
    },
  };
};

export default function Home({
  pitches,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { classes } = useStyle();
  const { push } = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const { toggleMenu } = useUiContext();

  const [isFilterOpen, toggleFilter] = useToggle(false);

  const handleClickPitches = useCallback(() => {
    push('/pitches');
  }, [push]);

  const handleFilter = useCallback((filteredDate: any) => {
    console.log('filting', filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    push('/login');
  }, [push]);

  const search = useCallback((filteredDate: any) => {
    setSearchInput(filteredDate);
  }, []);

  const handleTestClick = useCallback(() => {
    toggleMenu();
  }, [toggleMenu]);

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
              showError={false}
              helperText="I don't need help"
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
          <Button onClick={handleTestClick}>User</Button>
        </Paper>
        <ButtonRese
          label="toggle sidebar"
          onClick={() => toggleMenu()}
        ></ButtonRese>
        <Link href="/Test/Test">Go To Test</Link>
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
