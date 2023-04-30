import Box from '@mui/material/Box';
import ButtonRese from 'components/ButtonRese';
import { useAlert } from 'hooks/useAlert';
import useFlex from 'hooks/useFlex';
import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { useSignupStore } from './useSignupStore';

export default React.memo(ConfirmationStep);

function ConfirmationStep() {
  const { classes } = useStyles();
  const { column } = useFlex();
  const { alert } = useAlert();
  const {setPage} = useSignupStore()

  return <Box>

    <ButtonRese
    label='Confirm'
    onClick={() => {setPage('UserInfo')}}
    >
    </ButtonRese>
  </Box>;
}

const useStyles = makeStyles()((theme) => ({}));
