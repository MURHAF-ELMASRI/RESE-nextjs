import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

type Props = {
  path: string;
  title: string;
  icon: string;
};

function Item(props: Props) {
  const { path, title, icon } = props;
  const { classes, cx } = useStyles();
  const { push, pathname } = useRouter();

  const handleClick = useCallback(() => push(pathname), [pathname, push]);

  const isSelected = pathname === path;

  return (
    <IconButton
      key={path}
      className={cx(classes.listItemContainer, {
        [classes.selectedListItem]: isSelected,
      })}
      onClick={handleClick}
    >
      <div className={classes.listItem}>
        <Icon icon={icon} />
        <Typography>{title}</Typography>
      </div>
    </IconButton>
  );
}

export default memo(Item);

const useStyles = makeStyles()((theme) => ({
  listItemContainer: {
    width: '100%',
    height: 48,
    borderRadius: 0,
    justifyContent: 'flex-start',
  },
  listItem: {
    gap: 16,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  selectedListItem: {
    backgroundColor: theme.palette.action.active,
  },
}));
