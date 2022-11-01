import { Icon } from '@iconify/react';
import MatButton from '@mui/material/Button';
import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';
interface Props {
  className?: string;
  color?: 'primary' | 'default';
  label: string;
  onClick: () => void;
  icon?: string;
}

function ButtonRese(props: Props) {
  const { className, color = 'primary', onClick, label, icon } = props;
  const { classes, cx } = useStyles();
  return (
    <MatButton
      onClick={onClick}
      variant="contained"
      color={color}
      className={cx(className, classes.button, {
        [classes.buttonGray]: color === 'default',
        [classes.buttonGreen]: color === 'primary',
      })}
      startIcon={
        icon ? (
          <Icon className={classes.iconGreen} icon={icon} width={24} />
        ) : null
      }
    >
      {label}
    </MatButton>
  );
}

export default memo(ButtonRese);

const useStyles = makeStyles()((theme) => ({
  button: {
    color: '#fff',
    width: '100%',
  },
  buttonGreen: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  buttonGray: {
    color: theme.palette.primary.main,
  },
  iconGreen: {
    color: theme.palette.primary.main,
  },
}));
