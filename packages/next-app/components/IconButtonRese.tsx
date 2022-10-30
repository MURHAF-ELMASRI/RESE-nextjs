import { Icon } from '@iconify/react';
import ButtonBase from '@material-ui/core/ButtonBase';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { memo } from 'react';

interface Props {
  icon: string;
  onClick: () => void;
  size?: number;
  className?: string;
}

export default memo(IconButtonRese);

function IconButtonRese(props: Props) {
  const { onClick, icon, className, size = 24 } = props;

  const classes = useStyles();

  return (
    <div className={className}>
      <ButtonBase className={classes.iconButton} onClick={onClick}>
        <Icon width={size} height={size} className={classes.icon} icon={icon} />
      </ButtonBase>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  iconButton: {
    borderRadius: '50%',
    padding: 8,
  },
  icon: {
    color: theme.palette.text.primary,
  },
}));
