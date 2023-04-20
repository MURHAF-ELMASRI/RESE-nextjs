// import MuiPhoneNumber from 'material-ui-phone-number'

import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import useFlex from 'hooks/useFlex';
import { memo } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { makeStyles } from 'tss-react/mui';

interface Props {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  showError?: boolean;
  helperText?: string;
}

const PhoneNumber = (props: Props) => {
  const { column } = useFlex();
  const { classes, cx } = useStyle();
  const theme = useTheme();

  return (
    <Box className={column} position="relative" mb={theme.spacing(4)} width="100%">
      {props.label}
      <Box>
        <PhoneInput
          placeholder="Phone Number"
          value={props.value}
          onChange={props.onChange}
          specialLabel={''}
          country={'tr'}
          inputProps={{
            name: 'phone',
          }}
          inputStyle={{
            borderColor: props.showError ? theme.palette.error.main : '',
            width: '100%',
          }}
          inputClass={cx(classes.input, {
            [classes.inputError]: props.showError,
          })}
        />
        <HelperText text={props.helperText} shouldRender={!!props.showError} />
      </Box>
    </Box>
  );
};

const HelperText = memo(HelperTextComponent);
function HelperTextComponent({
  text,
  shouldRender,
}: {
  text?: string;
  shouldRender: boolean;
}) {
  const { classes } = useStyle();

  return shouldRender ? (
    <span className={classes.helperText}>{text}</span>
  ) : null;
}

const useStyle = makeStyles()((theme) => ({
  input: {
    transition: 'none !important',
    '&:focus': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main} !important`,
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  inputError: {
    '&:focus': {
      boxShadow: `0 0 0 1px ${theme.palette.error.main} !important`,
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
  helperText: {
    position: 'absolute',
    fontSize: theme.typography.overline.fontSize,
    color: theme.palette.error.main,
    marginLeft: theme.spacing(1.75),
    marginTop: theme.spacing(0.5),
  },
}));

export default PhoneNumber;
