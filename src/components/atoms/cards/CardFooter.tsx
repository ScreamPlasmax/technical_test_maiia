import { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid lightgray',
    padding: '12px 16px 10px 16px',
  },
}));

const CardFooter: FC = (props) => {
  const { children } = props;
  const classes = useStyle();

  return <div className={classes.root}>{children}</div>;
};

export default CardFooter;
