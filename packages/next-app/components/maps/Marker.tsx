import { Icon } from '@iconify/react';
import useTheme from '@mui/material/styles/useTheme';
import Tooltip from '@mui/material/Tooltip';
import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';
interface Props {
  onClick?: () => void;
  text?: string;
  lat: number;
  lng: number;
}

function Marker(props: Props) {
  const { onClick, text } = props;
  const color = useTheme().palette.error.main;
  const { classes } = useStyles();
  return (
    <div onClick={onClick} className={classes.container}>
      {text ? (
        <Tooltip title={text}>
          <Icon
            className={classes.icon}
            icon={'mdi:map-marker'}
            color={color}
            width={24}
          />
        </Tooltip>
      ) : (
        <Icon
          className={classes.icon}
          icon={'mdi:map-marker'}
          color={color}
          width={24}
        />
      )}
    </div>
  );
}

export default memo(Marker);

const useStyles = makeStyles()(() => ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    userSelect: 'none',
    cursor: 'pointer',
    '&:hover': {
      zIndex: 1,
    },
  },
  icon: {},
}));
