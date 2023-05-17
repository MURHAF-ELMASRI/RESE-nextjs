import Typography from '@mui/material/Typography';
import { FreeService, PaidService, PitchType } from '@rese/common/model/Pitch';
import { Coord } from '@rese/common/types/Coord';
import { useFormik } from 'formik';
import useLatLng from 'hooks/useLatLng';
import useWatcher from 'hooks/useWatcher';
import moment from 'moment';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { makeStyles } from 'tss-react/mui';
import ButtonRese from '../../components/ButtonRese';
import LocationChooser from '../../components/LocationChooser';

interface InitialValue {
  name: string;
  lat: number;
  lng: number;
  date: Date | undefined;
  services: FreeService & PaidService[];
}

interface Props {
  allPitches: PitchType[];
  onFilter: (filteredData: PitchType[]) => void;
}
//TODO save longitude and latitude and make search filter according to a circle with 5km radius
export default memo(Filter);
function Filter(props: Props) {
  const { classes } = useStyles();
  const latLng = useLatLng();
  const formik = useFormik<InitialValue>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      lat: latLng?.lat ?? 0,
      lng: latLng?.lng ?? 0,
      date: moment().toDate(),
      services: [] as FreeService & PaidService,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });


  const location = useMemo(
    () => ({ lat: formik.values.lat, lng: formik.values.lng }),
    [formik.values.lat, formik.values.lng]
  );

  const handleLocationSubmit = useCallback(
    (location: Coord) => {
      formik.handleChange('lat')(location.lat.toString());
      formik.handleChange('lat')(location.lng.toString());
    },
    [formik]
  );

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title}>Filter</Typography>
      </div>

      {/* <DateTimePicker
        defaultValue={moment().format('YYYY-MM-DD-HH:mm:ss')}
        onChange={formik.handleChange('date')}
        value={formik.values.date}
        slotProps={{ textField: { color: 'secondary' } }}
      /> */}

      <LocationChooser
        name="location"
        value={location}
        submit={handleLocationSubmit}
        title="Location"
        color='secondary'
      />

      <ButtonRese color="secondary" label="Filter" />
    </div>
  );
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 28,
    backgroundColor: theme.palette.primary.main,
    width: '100vw',
    maxWidth: 502,
    gap: 16,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.grey[50],
    fontSize: 24,
  },
}));
