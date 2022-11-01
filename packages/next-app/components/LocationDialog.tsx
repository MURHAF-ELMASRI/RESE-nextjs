import Dialog from '@mui/material/Dialog';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery';
import { PitchType } from '@rese/common/model/Pitch';
import { memo, useCallback, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import Button from './ButtonRese';
import GoogleMap from './maps/GoogleMap';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (x: Pick<PitchType, 'location'>) => void;
}

function LocationDialog(props: Props) {
  const { open, onClose, onSubmit } = props;
  const [point, setPoint] = useState<Pick<PitchType, 'location'>>();
  const { classes } = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    if (point) {
      onSubmit(point);
    }
    handleClose();
  }, [onSubmit, handleClose, point]);

  const handleMapClick = useCallback(
    (coord) => {
      const { lat, lng } = coord;
      setPoint({ location: { lat, lng } });
    },
    [setPoint]
  );
  return (
    <Dialog open={open ?? true} onClose={onClose} fullScreen={fullScreen}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography component={'h5'} className={classes.title}>
            Select Pitch Location
          </Typography>
        </div>
        <div className={classes.body}>
          <GoogleMap pitches={point ? [point] : []} onClick={handleMapClick} />
        </div>
        <div className={classes.actions}>
          <Button label="Close" color="default" onClick={handleClose} />
          <Button label="Select" onClick={handleSubmit} />
        </div>
      </div>
    </Dialog>
  );
}

export default memo(LocationDialog);

const useStyles = makeStyles()((theme) => ({
  container: {
    width: 520,
    height: 520,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
  },
  body: {
    padding: 16,
    flex: 1,
    width: '100%',
  },
  actions: {
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 8,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));
