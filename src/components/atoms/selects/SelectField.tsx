import { FC } from 'react';
import Select from 'components/atoms/selects/Select';
import { FormControl, FormHelperText, InputLabel, makeStyles, MenuItem, SelectProps } from '@material-ui/core';
import { useField } from 'formik';

type Props = Omit<SelectProps, 'name'> & {
  // We override the name prop to force it to be required as it's needed by Formik
  name: string;
  label: string;
  disabledLabel?: string;
};

const useStyles = makeStyles(() => ({
  inputLabelRoot: {
    fontWeight: 500,
    fontSize: 20,
  },
  formControlSelect: {
    // Replicated Maiia's UI Select style by overriding manually the margin
    '& > .MuiInputBase-root': {
      marginTop: 26,
    },
    // I override locally the width of the bottom margin of the :before element
    // and not globally because there are some inputs with underline on Maiia
    '& > .MuiInput-underline': {
      '&:hover': {
        '&:before': {
          borderBottom: 0,
        },
      },
      '&:before, &:after': {
        borderBottom: 0,
      },
    },
  },
}));

const SelectField: FC<Props> = (props) => {
  const { children, name, label, disabledLabel, ...rest } = props;
  const classes = useStyles();
  const [field, meta] = useField(name);
  const errorMessage = meta.touched && meta.error;
  const { value, ...fieldRest } = field;

  return (
    <FormControl fullWidth margin="dense" error={!!errorMessage} classes={{ root: classes.formControlSelect }}>
      <InputLabel classes={{ root: classes.inputLabelRoot }}>{label}</InputLabel>
      {/* The forced value as 'none' is a dirty hack because of MUI label's behavior when no value */}
      <Select {...rest} value={value === null ? 'none' : value} {...fieldRest}>
        {disabledLabel && (
          <MenuItem value="none" disabled>
            {disabledLabel}
          </MenuItem>
        )}
        {children}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
