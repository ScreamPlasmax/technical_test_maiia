import { FC, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input: FC<InputProps> = (props) => {
  const { className = '', ...rest } = props;

  return <input className={`input ${className}`} {...rest} />;
};

export default Input;
