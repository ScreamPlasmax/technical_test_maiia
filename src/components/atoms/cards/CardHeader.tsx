import { FC } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    padding: '12px 16px 10px 16px',
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
}));

const CardHeader: FC = (props) => {
  const { children } = props;
  const classes = useStyle();

  return <div className={classes.root}>{children}</div>;
};

export default CardHeader;
