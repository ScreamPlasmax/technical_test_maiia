import { ButtonHTMLAttributes, FC } from 'react';
import { BUTTON_STYLE } from 'utils/constants/style';

export type VariantType = 'FORM' | 'BUTTON';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: VariantType;
};

const Button: FC<Props> = (props) => {
  const { className = '', variant = 'BUTTON', children, ...rest } = props;

  return (
    <button className={`button ${BUTTON_STYLE[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
