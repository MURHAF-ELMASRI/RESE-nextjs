import { Icon } from '@iconify/react';
import ButtonBase from '@mui/material/ButtonBase';
import { memo, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  icon: string;
  onClick: () => void;
  size?: number;
  className?: string;
}

export default memo(IconButtonRese);

function IconButtonRese(props: Props) {
  const { onClick, icon, className, size = 24 } = props;

  const { classes } = useStyles();

  const hanldeClick=useCallback(() => {
    console.log('render');
    onClick()
  }, [onClick]);


  return (
    <div className={className}>
      <ButtonBase className={classes.iconButton} onClick={hanldeClick}>
        <Icon width={size} height={size} className={classes.icon} icon={icon} />
      </ButtonBase>
    </div>
  );
}

const useStyles = makeStyles()((theme) => ({
  iconButton: {
    borderRadius: '50%',
    padding: 8,
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));
