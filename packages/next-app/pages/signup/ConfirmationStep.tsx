import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/system';
import ButtonRese from 'components/ButtonRese';
import { useConfirmCodeMutation } from 'hooks/generated/apolloHooks';
import { useAlert } from 'hooks/useAlert';
import useFlex from 'hooks/useFlex';
import React, { useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useSignupStore } from './useSignupStore';

export default React.memo(ConfirmationStep);

function ConfirmationStep() {
  const { classes } = useStyles();
  const { column4, row16, row } = useFlex();
  const theme = useTheme();
  const { alert } = useAlert();
  const { setPage } = useSignupStore();
  const [code, setCode] = React.useState(['', '', '', '', '', '']);
  const [mutate, result] = useConfirmCodeMutation();
  const inputRef = React.useRef<HTMLInputElement[]>([]);

  const submit = useCallback(async () => {
    const codeString = code.join('');
    if (codeString.length !== 6) {
      alert('error', 'Please enter 6-digit code');
      return;
    }
    try {
      const { data } = await mutate({
        variables: { confirmCodeInput: { code: codeString } },
      });
      if (data?.confirmCode?.__typename === 'ConfirmCodeError') {
        console.log(data.confirmCode.params.message);
        alert('error', data.confirmCode.params.message!);
        return;
      }
      setPage(0);
    } catch (error) {
      alert('error', 'something went wrong, please try again');
    }
  }, [alert, code, mutate, setPage]);

  const handleChange = useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (index === 0 && value.length === 6) {
        setCode(value.split('').map((item) => item));
      }
      //prevent user from entering more than euler number or more than 1 character
      if (value.length > 1) return;
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value.length === 1 && index < 5) {        
        inputRef.current[index + 1].focus();
      }
    },
    [code]
  );

  const resendCode = useCallback(() => {
    alert('error', 'Resend Code Failed');
  }, [alert]);

  const handleRef = useCallback((ref:HTMLInputElement) => {
    inputRef.current.push(ref);
  }, []);

  


  return (
    <Box className={column4} paddingX={theme.spacing(8)}>
      <Box className={row} justifyContent="center" pb={theme.spacing(8)}>
        <Typography variant="h5">Confirmation Code</Typography>
      </Box>
      <Box>
        <Typography color="GrayText">
          Please enter the 6-digit code sent to your email address
        </Typography>
      </Box>

      <Box mb={2} className={row16}>
        {code.map((item, index) => (
          <OutlinedInput
            key={index}
            onKeyDown={(e) => {
              if (e.key === 'e') e.preventDefault();
            }}
            type="number"
            value={code[index]}
            onChange={handleChange(index)}
            className={classes.input}
            inputRef={handleRef}
          ></OutlinedInput>
        ))}
      </Box>
      <Box mb={theme.spacing(1)}>
        <Link className={classes.resendCode} onClick={resendCode}>
          Resend Code
        </Link>
      </Box>
      <Box maxWidth={theme.spacing(16)}>
        <ButtonRese
          label="Confirm"
          onClick={submit}
          disabled={result.loading}
        />
      </Box>
    </Box>
  );
}

const useStyles = makeStyles()(() => ({
  resendCode: {
    cursor: 'pointer',
  },
  //hide arrow spinner
  input: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '& input::[type=number]': {
      MozAppearance: 'textfield',
    },
  },
}));
