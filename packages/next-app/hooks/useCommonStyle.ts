/* eslint-disable tss-unused-classes/unused-classes */
import { makeStyles } from 'tss-react/mui';

const useStyle = makeStyles()(() => ({
  label: {
    '& span': {
      color: 'red',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  BoxInline: {
    flexDirection: 'row',
    display: 'flex',
  },
  BoxText: {
    display: 'flex',
    marginTop: '8px',
    '& span': {
      color: 'red',
      paddingLeft: 5,
    },
  },
}));

export default function useCommonStyle() {
  const { classes } = useStyle();
  console.log('classes', classes);
  
  return { commonClasses: classes };
}
