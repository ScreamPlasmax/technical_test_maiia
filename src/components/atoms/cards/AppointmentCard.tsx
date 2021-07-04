import { FC } from 'react';
import Card from 'components/atoms/cards/Card';
import CardHeader from 'components/atoms/cards/CardHeader';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { CardContent, makeStyles, Typography } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CardFooter from 'components/atoms/cards/CardFooter';
import PersonIcon from '@material-ui/icons/Person';
import Button from 'components/atoms/buttons/Button';
import { Appointment, Patient, Practitioner } from '@prisma/client';
import { format } from 'date-fns';

type Props = {
  appointment: Appointment;
  patient?: Patient;
  practitioner?: Practitioner;
};

const useStyles = makeStyles((theme) => ({
  cardTitleText: {
    marginRight: theme.spacing(4),
  },
  icons: {
    paddingBottom: 3,
    marginRight: theme.spacing(1),
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  cardMainContent: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardContentName: {
    fontSize: 18,
  },
  cardFooterInformations: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const AppointmentCard: FC<Props> = (props) => {
  const { appointment, patient, practitioner } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardHeader>
        <DateRangeIcon classes={{ root: classes.icons }} />
        <Typography variant="subtitle1" component="span">
          <span className={classes.cardTitleText}>{format(new Date(appointment.startDate), 'EEE. dd MMMM yyyy')}</span>
        </Typography>
        <ScheduleIcon classes={{ root: classes.icons }} />
        <Typography variant="subtitle1" component="span">
          {format(new Date(appointment.startDate), 'HH:mm')}
        </Typography>
      </CardHeader>
      <CardContent classes={{ root: classes.cardContent }}>
        <img
          width={50}
          height={50}
          alt="Practitioner's image"
          src="https://www.maiia.com/static/images/default_practitioner.svg"
        />
        {practitioner && (
          <div className={classes.cardMainContent}>
            <Typography variant="body1" className={classes.cardContentName}>
              {practitioner.firstName} {practitioner.lastName}
            </Typography>
            <Typography variant="body2">{practitioner.speciality}</Typography>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className={classes.cardFooterInformations}>
          {patient && (
            <>
              <PersonIcon classes={{ root: classes.icons }} />
              <Typography variant="body1">
                {patient.firstName} {patient.lastName}
              </Typography>
            </>
          )}
        </div>
        <Button variant="contained">Cancel</Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentCard;
