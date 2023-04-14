import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Icon } from '@iconify/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { PitchType } from '@rese/common/model/Pitch';
import useFlex from 'hooks/useFlex';
import dynamic from 'next/dynamic';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

export default React.memo(PitchListItem);
type Props = {
  pitch: PitchType;
};

const MapNoSSR = dynamic(() => import('components/Map'), { ssr: false });

function PitchListItem({ pitch }: Props) {
  const { classes, cx } = useStyles();
  const { row8, row4, column8 } = useFlex();
  const [parent] = useAutoAnimate();
  const {
    name,
    openAt,
    closeAt,
    phoneNumber,
    email,
    numberOfSubPitch,
    freeServices,
    paidServices,
    location,
  } = pitch;

  return (
    <Card className={classes.card} >
      <CardHeader
        title={name}
        subheader={`Opens from ${openAt} to ${closeAt}`}
      ></CardHeader>

      <CardContent className={cx(classes.content, column8)}>
        <div>
          <Typography variant="h6" gutterBottom>
            Number of Pitches
          </Typography>
          <div className={row8}>
            <Icon inline icon="mdi:soccer-field" fontSize={24} />
            <Typography variant="body1" gutterBottom>
              {numberOfSubPitch}
            </Typography>
          </div>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            Connections
          </Typography>
          <div className={row8}>
            <Icon icon="mdi:phone" fontSize={24} />
            <Typography variant="body1">{phoneNumber}</Typography>
          </div>
          <div className={row8}>
            <Icon icon="mdi:email" fontSize={24} />
            <Typography variant="body1">{email}</Typography>
          </div>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            Free Services
          </Typography>
          <div className={row4}>
            {freeServices?.map((x) => (
              <Chip label={x} />
            ))}
          </div>
        </div>
        <div>
          <Typography variant="h6" gutterBottom>
            Paid Services
          </Typography>
          <div className={row4}>
            {paidServices?.map((x) => (
              <Chip label={x} />
            ))}
          </div>
        </div>
        <div className={classes.map}>
          <MapNoSSR location={location}></MapNoSSR>
        </div>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles()((theme) => ({
  map: {
    borderRadius: 16,
    flex: 1,
    minHeight: 200,
    margin: '1rem',
    border: `${theme.palette.divider} 3px solid`,
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  },
}));
