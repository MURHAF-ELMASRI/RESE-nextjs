import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PitchType } from '@rese/common/model/Pitch';
import query from '@rese/database/query/query';
import IconButtonRese from 'components/IconButtonRese';
import TextFieldRese from 'components/TextFieldRese';
import Transaction from 'components/Transaction';
import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useToggle } from 'react-use';
import { makeStyles } from 'tss-react/mui';
import Filter from '../components/Filter';
import { useIndex } from './index/indexStore';
import PitchListItem from './index/PitchListItem';
import PitchView from './index/PitchView';
import { useUiContext } from './uiStore';

export const getServerSideProps: GetServerSideProps<{
  pitches: PitchType[];
}> = async () => {
  // TODO : get pitcher from db according to user location
  const pitches = await query.getPitches();

  return {
    props: {
      pitches,
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
  const selectedPitch = useIndex((x) => x.selectedPitch);

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
            />
          </div>
          <Typography className={classes.listTitle}>Halı Sahalar</Typography>
          {pitches?.map((e) => (
            <PitchListItem pitch={e} key={e._id} />
          ))}
        </Paper>
        <AnimatePresence>
          {!selectedPitch ? null : (
            <Transaction animate="dissolve" controlKey={selectedPitch._id}>
              <PitchView pitch={selectedPitch}></PitchView>
            </Transaction>
          )}
        </AnimatePresence>
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
    gap: 64,
    height: '100%',
  },
  pitches: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  pitchesList: {
    maxWidth: 464,
    width: '100%',
    height: '100%',
    flex1: 1,
  },
  listTitle: {
    fontSize: 24,
    padding: 16,
  },
  search: {
    width: '100%',
  },
}));
