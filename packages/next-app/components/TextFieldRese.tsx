import { Icon } from '@iconify/react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { memo, useCallback } from 'react';
import { makeStyles } from 'tss-react/mui';

interface Props {
  icon?: string;
  onChange: (x: string) => void;
  name: string;
  value: string;
  title: string;
  variant?: 'outlined';
  className?: string;
  formik?: boolean;
  type?: React.InputHTMLAttributes<unknown>['type'];
}

export default memo(TextFieldRese);

function TextFieldRese(props: Props) {
  const {
    onChange,
    icon,
    name,
    value,
    title,
    variant = 'standard',
    className,
    formik = false,
    type = 'text',
  } = props;

  const { classes } = useStyles();

  const handleChange = useCallback(
    (event: any) => {
      onChange(formik ? event : event.target.value);
    },
    [onChange]
  );

  return (
    <TextField
      name={name}
      onChange={handleChange}
      value={value}
      label={title}
      type={type}
      variant={variant}
      className={className}
      InputProps={{
        endAdornment: icon && (
          <InputAdornment position="end">
            <Icon icon={icon} width={20} className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
}

const useStyles = makeStyles()((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
}));
