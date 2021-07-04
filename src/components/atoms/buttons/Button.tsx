import { FC } from 'react';
import { Button as MUIButton, ButtonProps } from '@material-ui/core';

const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'contained', ...rest } = props;

  return (
    <MUIButton disableElevation variant={variant} {...rest}>
      {children}
    </MUIButton>
  );
};

export default Button;
