import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SelectMui from '@mui/material/Select';
import { makeStyles } from 'tss-react/mui';

import { FormikHandlers } from 'formik';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';

export default React.memo(Select);

interface Props<V = any> {
  label: string;
  data: {
    title: string;
    value: V;
  }[];
  value: V;
  onChange: FormikHandlers['handleChange'];
  name: string;
  helperText?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  className?: string;
}

function Select(props: Props) {
  const {
    data,
    onChange,
    value,
    label,
    helperText,
    variant = 'outlined',
    className,
    name,
  } = props;
  const { classes, cx } = useStyles();
  const [id] = useState(uniqueId());

  return (
    <FormControl
      variant={variant}
      className={cx(classes.formControl, className)}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <SelectMui
        label={label}
        labelId={id}
        onChange={onChange}
        value={value}
        name={name}
      >
        {data.map((row, idx) => (
          <MenuItem key={idx} value={row.value}>
            {row.title}
          </MenuItem>
        ))}
      </SelectMui>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

const useStyles = makeStyles()(() => ({
  formControl: {
    minWidth: 120,
  },
}));
