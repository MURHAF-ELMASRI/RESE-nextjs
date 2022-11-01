import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FreeService, PaidService, PitchType } from '@rese/common/model/Pitch';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { makeStyles } from 'tss-react/mui';
import TextFieldRese from './TextFieldRese';
interface InitialValue {
  name: string;
  location: string;
  date: Date | undefined;
  services: FreeService & PaidService[];
}

interface Props {
  isOpen: boolean;
  allPitches: PitchType[];
  onClose: () => void;
  onFilter: (filteredData: PitchType[]) => void;
}
//TODO save longitude and latitude and make search filter according to a circle with 5km radius
export default memo(Filter);

function Filter(props: Props) {
  const { onClose, isOpen } = props;
  const { classes } = useStyles();
  const formik = useFormik<InitialValue>({
    initialValues: {
      name: '',
      location: '',
      date: undefined,
      services: [] as FreeService & PaidService,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <motion.div
      className={classes.filterContainer}
      transition={{ duration: 0.3 }}
      animate={{
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 316 : 0,
      }}
    >
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography className={classes.title}>Filter</Typography>
          <IconButton onClick={onClose}>
            <Icon
              icon="mdi:close"
              width={20}
              height={20}
              className={classes.closeIcon}
            />
          </IconButton>
        </div>

        <TextFieldRese
          name="name"
          title="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {/* <TextFiledWithIcon
        name="location"
        onChange={formik.handleChange}
        icon="mdi:map-marker-radius"
        value={formik.values.location}
      /> */}

        <TextFieldRese
          name="date"
          title="date"
          onChange={formik.handleChange}
          icon="mdi:heart-plus-outline"
          value={formik.values.date ? formik.values.date.toString() : ''}
          
        />

        <TextFieldRese
          name="date"
          title="date"
          onChange={formik.handleChange}
          icon="mdi:heart-plus-outline"
          value={formik.values.date ? formik.values.date.toString() : ''}
        />
      </div>
    </motion.div>
  );
}

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 28,
    backgroundColor: theme.palette.primary.main,
    width: '100vw',
    maxWidth: 502,
    gap: 16,
    borderRadius: 8,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.grey[50],
    fontSize: 24,
  },
  textField: {
    width: '100%',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  closeIcon: {
    color: theme.palette.grey[50],
  },
  inputFilled: {
    color: theme.palette.secondary.main,
  },
  inputEmpty: {
    color: theme.palette.grey[50],
  },
  filterContainer: {
    position: 'absolute',
    right: 0,
    top: -316,
    zIndex: 99,
  },
}));
