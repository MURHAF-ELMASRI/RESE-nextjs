import { Icon } from '@iconify/react';
import Button from '@mui/material/Button';
import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';
interface Props {
  className?: string;
  color?: 'primary' | 'secondary' | 'gray';
  label: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
}

function ButtonRese(props: Props) {
  const {
    className,
    color = 'primary',
    onClick,
    label,
    icon,
    disabled = false,
  } = props;
  const { classes, cx } = useStyles();
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color={color}
      className={cx(className, classes.button, { [classes.isIcon]: !!icon })}
      startIcon={icon ? <Icon icon={icon} width={24} /> : null}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default memo(ButtonRese);

const useStyles = makeStyles()(() => ({
  button: {
    width: '100%',
  },
  isIcon: {
    justifyContent: 'flex-start',
  },
}));
