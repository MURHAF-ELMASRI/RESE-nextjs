// import MuiPhoneNumber from 'material-ui-phone-number'

import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import useFlex from 'hooks/useFlex';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { makeStyles } from 'tss-react/mui';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
}

const PhoneNumber = (props: Props) => {
  const { column } = useFlex();
  const { classes } = useStyle();
  const theme = useTheme();

  return (
    <Box className={column} mb={theme.spacing(4)} width="100%">
      {props.label}
      <Box>
        <PhoneInput
          specialLabel={''}
          country={'tr'}
          inputStyle={{
            borderColor: props.error ? theme.palette.error.main : '',
            width: '100%',
          }}
          inputClass={classes.input}
        />
        {props.error && (
          <p
            style={{ color: 'red' }}
            className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense"
          >
            {props.helperText}
          </p>
        )}
      </Box>
    </Box>
  );
};

const useStyle = makeStyles()((theme) => ({
  input: {
    transition:'none !important', 
    '&:focus': {
      outline: `${theme.palette.primary.main} !important`,
      boxShadow:`0 0 0 1px ${theme.palette.primary.main} !important`,
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
}));

export default PhoneNumber;
