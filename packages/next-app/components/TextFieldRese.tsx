import { Icon } from '@iconify/react';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import { memo, useCallback } from 'react';

interface Props {
  icon?: string;
  onChange: (x: string) => void;
  name: string;
  value: string;
  title: string;
  variant?: 'outlined';
  className?: string;
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
  } = props;

  const classes = useStyles();

  const handleChange = useCallback(
    (event: any) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <TextField
      name={name}
      onChange={handleChange}
      value={value}
      label={title}
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

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
}));
