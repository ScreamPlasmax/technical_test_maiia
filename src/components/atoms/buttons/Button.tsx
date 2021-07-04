import { FC } from 'react';
import { Button as MUIButton, ButtonProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 20,
  },
}));

const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'contained', ...rest } = props;
  const classes = useStyles();

  return (
    <MUIButton disableElevation variant={variant} classes={classes} {...rest}>
      {children}
    </MUIButton>
  );
};

export default Button;
