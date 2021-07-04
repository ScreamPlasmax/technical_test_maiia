import { FC } from 'react';
import { Card as MUICard, CardProps, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  root: {
    borderRadius: 6,
    minHeight: 100,
    maxWidth: 400,
  },
}));

const Card: FC<CardProps> = (props) => {
  const { children, ...rest } = props;
  const classes = useStyle();

  return (
    <MUICard classes={classes} {...rest}>
      {children}
    </MUICard>
  );
};

export default Card;
