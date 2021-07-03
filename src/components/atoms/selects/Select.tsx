import { FC } from 'react';
import { makeStyles, Select as MUISelect, SelectProps } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  select: {
    backgroundColor: '#F1F4F5',
    width: '100%',
    padding: '9px 35px 9px 12px',
  },
}));

const Select: FC<SelectProps> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyles();

  return (
    <MUISelect classes={classes} {...rest}>
      {children}
    </MUISelect>
  );
};

export default Select;
