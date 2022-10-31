import { Icon } from '@iconify/react';
import MatButton from '@material-ui/core/Button';
import makeStyle from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import { memo } from 'react';

interface Props {
  className?: string;
  color?: 'primary' | 'default';
  label: string;
  onClick: () => void;
  icon?: string;
}

function ButtonRese(props: Props) {
  const { className, color = 'primary', onClick, label, icon } = props;
  const classes = useStyle();
  return (
    <MatButton
      onClick={onClick}
      variant="contained"
      color={color}
      className={classNames(className, classes.button, {
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

const useStyle = makeStyle((theme) => ({
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
