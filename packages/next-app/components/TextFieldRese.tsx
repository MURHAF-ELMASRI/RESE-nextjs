import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { memo, useCallback, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import IconButtonRese from './IconButtonRese';

interface Props {
  icon?: string;
  onChange?: (x: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  title: string;
  variant?: 'outlined';
  color?: 'secondary' | 'primary';
  className?: string;
  type?: React.InputHTMLAttributes<unknown>['type'];
  helperText?: string;
  iconClick?: () => void;
  showError?: boolean;
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
    color = 'primary',
    className,
    type = 'text',
    helperText,
    iconClick,
    showError,
  } = props;
  const { classes, cx } = useStyles();
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);
  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <TextField
      name={name}
      onChange={onChange}
      value={value}
      label={title}
      type={type}
      variant={variant}
      className={cx(classes.input, className)}
      color={color}
      helperText={<HelperText text={helperText} shouldRender={!!showError} />}
      error={showError}
      InputProps={{
        onFocus: handleFocus,
        onBlur: handleBlur,
        endAdornment: icon && (
          <InputAdornment position="end">
            <IconButtonRese
              onClick={iconClick}
              icon={icon}
              variant={focused ? color : 'text'}
            ></IconButtonRese>
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
  input: {
    marginBottom: theme.spacing(4),
    width:"100%"
  },
  helperText: {
    position: 'absolute',
  },
}));
