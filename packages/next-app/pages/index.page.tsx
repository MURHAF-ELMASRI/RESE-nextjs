import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PitchType } from '@rese/common/model/Pitch';
import query from '@rese/database/query/query';
import IconButtonRese from 'components/IconButtonRese';
import TextFieldRese from 'components/TextFieldRese';
import Transition from 'components/Transition';
import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { useToggle } from 'react-use';
import { makeStyles } from 'tss-react/mui';
import Filter from './index/Filter';
import { useIndex } from './index/indexStore';
import PitchListItem from './index/PitchListItem';
import PitchView from './index/PitchView';
import { useUiContext } from './uiStore';
import { useUser } from './userStore';

import { Coord } from '@rese/common/types/Coord';
import useLatLng from 'hooks/useLatLng';
import useWatcher from 'hooks/useWatcher';
import dynamic from 'next/dynamic';

const Menu = dynamic(() => import('@mui/material/Menu'), { ssr: false });

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
  const { user } = useUser();
  const { toggleMenu } = useUiContext();
  const [isFilterOpen, toggleFilter] = useToggle(false);
  const selectedPitch = useIndex((x) => x.selectedPitch);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const latLng = useLatLng();
  const [location, setLocation] = useWatcher(latLng);
  const handleClickPitches = useCallback(() => {
    push('/pitches');
  }, [push]);

  const handleFilter = useCallback((filteredDate: any) => {
    console.log('filting', filteredDate);
  }, []);

  const handleSignupPage = useCallback(() => {
    push('/login');
  }, [push]);

  const search = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  }, []);

  const filteredData = useMemo(
    () =>
      pitches.filter((e) =>
        e.name.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [pitches, searchInput]
  );

  const openFilter = useCallback((event: any) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeFilter = useCallback(() => {
    setAnchorEl(null);
  }, []);

  function handleChange(data: Coord) {
    setLocation(data);
  }

  return (
    <div className={classes.container}>
      <Menu
        MenuListProps={{ style: { padding: 0 } }}
        onClose={closeFilter}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <Filter allPitches={pitches} onFilter={handleFilter} />
      </Menu>

      <div className={classes.header}>
        <Typography className={classes.pitches} onClick={handleClickPitches}>
          Pitches
        </Typography>
        <IconButtonRese icon="bi:filter" onClick={openFilter} />
        {!user ? (
          <IconButtonRese icon="mdi:login" onClick={handleSignupPage} />
        ) : null}
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
          <Box>
            <AnimatePresence>
              {filteredData?.map((e, i) => (
                <Transition key={i} animate="dissolve" controlKey={i}>
                  <PitchListItem pitch={e} />
                </Transition>
              ))}
            </AnimatePresence>
          </Box>
        </Paper>
        <Box>
          <AnimatePresence>
            {!selectedPitch ? null : (
              <Transition animate="dissolve" controlKey={selectedPitch._id}>
                <PitchView pitch={selectedPitch}></PitchView>
              </Transition>
            )}
          </AnimatePresence>
        </Box>
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
