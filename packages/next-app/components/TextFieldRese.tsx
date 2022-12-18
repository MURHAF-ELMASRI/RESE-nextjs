import { Icon } from '@iconify/react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { memo, useCallback, useMemo } from 'react';
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
  showError: boolean | undefined;
  helperText: string | undefined;
  touched?: boolean;
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
    showError = undefined,
    helperText,
    touched = undefined,
  } = props;

  const { classes, cx } = useStyles();

  const handleChange = useCallback(
    (event: any) => {
      onChange(formik ? event : event.target.value);
    },
    [onChange]
  );

  const shouldShowError = useMemo(
    () => (showError === undefined ? false : !!touched && !!helperText),
    [touched, showError, helperText]
  );
  const helperTextUI = useMemo(
    () => (showError === undefined ? helperText : touched ? helperText : ''),
    [showError, helperText, touched]
  );

  return (
    <TextField
      name={name}
      onChange={handleChange}
      value={value}
      label={title}
      type={type}
      variant={variant}
      className={cx(className)}
      helperText={
        <HelperText text={helperText} shouldRender={shouldShowError} />
      }
      error={shouldShowError}
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
const HelperText = memo(HelperTextComponent);
function HelperTextComponent({
  text,
  shouldRender,
}: {
  text?: string;
  shouldRender: boolean;
}) {
  const { classes } = useStyles();

  return shouldRender ? (
    <span className={classes.helperText}>{text}</span>
  ) : null;
}

const useStyles = makeStyles()((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
  helperText: {
    position: 'absolute',
  },
}));
