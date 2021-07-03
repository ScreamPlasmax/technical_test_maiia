import { FC } from 'react';
import Input, { InputProps } from 'components/atoms/inputs/Input';
import { useField } from 'formik';

type Props = Omit<InputProps, 'name'> & {
  name: string;
};

const InputField: FC<Props> = (props) => {
  const { className = '', name, ...rest } = props;
  const [field, meta, helpers] = useField(name);

  return <Input className={className} {...rest} {...field} />;
};

export default InputField;
