import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  src: string;
  className?: string;
  onClick?: () => void;
}

function Avatar(props: Props) {
  const { src, className, onClick } = props;
  const { classes, cx } = useStyles();
  return (
    <div className={cx(className, classes.avatarContainer)} onClick={onClick}>
      <img className={classes.avatar} src={src} />
    </div>
  );
}

export default memo(Avatar);

const useStyles = makeStyles()((theme) => ({
  avatar: {
    width: '100%',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 500000,
  },
}));
