import { FC, InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input: FC<InputProps> = (props) => {
  const { className = '', ...rest } = props;

  return (
    <div className="input">
      <input className={className} {...rest} />
    </div>
  );
};

export default Input;
