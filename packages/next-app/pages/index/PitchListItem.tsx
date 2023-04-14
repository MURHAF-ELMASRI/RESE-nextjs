import Typography from '@mui/material/Typography';
import type { PitchType } from '@rese/common/model/Pitch';
import React, { useCallback, useMemo } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useIndex } from './indexStore';
import ListItemButton from '@mui/material/ListItemButton';

export default React.memo(PitchListItem);
type Props = {
  pitch: PitchType;
};
function PitchListItem({ pitch }: Props) {
  const { name, openAt, closeAt, freeServices,_id } = pitch;
  const {selectPitch,selectedPitch}=useIndex()

  const isSelected=useMemo(()=>selectedPitch===_id,[selectedPitch,_id])
  const handleClick=useCallback(()=>{
    selectPitch(pitch)
  },[pitch, selectPitch])



  const { classes } = useStyles();
  return (
    <ListItemButton selected={isSelected} onClick={handleClick}>
      <div className={classes.left}>
        <Typography className={classes.name}>{name}</Typography>
        <div className={classes.featureContainer}>
          {freeServices?.map((service, idx) => (
            <div key={idx} className={classes.service}>
              <Typography>{service}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <Typography>{openAt}</Typography>
        <Typography>{closeAt}</Typography>
      </div>
    </ListItemButton>
  );
}

const useStyles = makeStyles()((theme) => ({
  left: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  right: {
    maxWidth: 48,
  },
  featureContainer: {
    display: 'flex',
    gap: 8,
  },
  service: {
    padding: '4px 8px',
    background: theme.palette.background.default,
    borderRadius: 16,
  },
  name: {
    textAlign: 'start',
  },
}));
