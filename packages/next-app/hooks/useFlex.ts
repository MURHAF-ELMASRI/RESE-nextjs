/* eslint-disable tss-unused-classes/unused-classes */
import { makeStyles } from 'tss-react/mui';

export default function useFlex() {
  const { classes } = useStyles();

  return {
    ...classes
  };
}

const useStyles = makeStyles()(() => ({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column4: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  row4: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
    column8: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    },
    row8: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    },
    column12: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    },
    row12: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    },
    column16: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    },
    row16: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    },
    column20: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    },
    row20: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    },
    column24: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    },
    row24: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
    },
    column28: {
    display: 'flex',
    flexDirection: 'column',
    gap: 28,
    },
    row28: {
    display: 'flex',
    flexDirection: 'row',
    gap: 28,
    },
    column32: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    },
    row32: {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
    },
}));
