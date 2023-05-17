import { Icon } from '@iconify/react';
import ButtonBase from '@mui/material/ButtonBase';
import { memo, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  icon: string;
  onClick: ((event?: any) => void) | undefined;
  size?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'text';
}

export default memo(IconButtonRese);

function IconButtonRese(props: Props) {
  const { onClick, icon, className, size = 24, variant = 'text' } = props;

  const { classes ,cx} = useStyles();

  const handleClick = useCallback(
    (event: any) => {
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <div className={className}>
      <ButtonBase className={classes.iconButton} onClick={handleClick}>
        <Icon width={size} height={size} className={classes[variant]} icon={icon} />
      </ButtonBase>
    </div>
  );
}

const useStyles = makeStyles()((theme) => ({
  iconButton: {
    borderRadius: '50%',
    padding: 8,
  },
  // eslint-disable-next-line tss-unused-classes/unused-classes
  primary: {
    color: theme.palette.primary.main,
  },
    // eslint-disable-next-line tss-unused-classes/unused-classes
  secondary: {
    color: theme.palette.secondary.main,
  },
    // eslint-disable-next-line tss-unused-classes/unused-classes
  text:{
    color: theme.palette.text.primary,
  }
}));
