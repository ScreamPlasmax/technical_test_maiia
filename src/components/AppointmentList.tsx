import { useSelector } from 'react-redux';
import { StoreType } from 'store';
import { Appointment, Patient, Practitioner } from '@prisma/client';
import { appointmentsSelectors } from 'store/appointments';
import AppointmentCard from 'components/atoms/cards/AppointmentCard';
import { patientsSelectors } from 'store/patients';
import { practitionersSelectors } from 'store/practitioners';
import { makeStyles, Typography } from '@material-ui/core';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  noAppointments: {
    marginTop: theme.spacing(3),
  },
  cardContainer: {
    width: 400,
    padding: theme.spacing(1),
  },
}));

const AppointmentList = () => {
  const classes = useStyles();
  const appointments = useSelector<StoreType, Appointment[]>((state) =>
    appointmentsSelectors.selectAll(state.appointments),
  );
  const patients = useSelector<StoreType, Patient[]>((state) => patientsSelectors.selectAll(state.patients));
  const practitioners = useSelector<StoreType, Practitioner[]>((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );
  // W
  const patientsMapper = useMemo(() => {
    return patients.reduce((acc: Record<number, Patient>, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }, [patients]);
  const practitionersMapper = useMemo(() => {
    return practitioners.reduce((acc: Record<number, Practitioner>, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }, [practitioners]);

  return (
    <div className={classes.root}>
      {appointments.length === 0 && (
        <Typography variant="body1" classes={{ root: classes.noAppointments }}>
          Il n'y a pas de rendez-vous. Vous pouvez en créer un via le formulaire ci-dessus !
        </Typography>
      )}
      {appointments.map((appointment) => {
        const patient = patientsMapper[appointment.patientId];
        const practitioner = practitionersMapper[appointment.practitionerId];

        return (
          <div key={appointment.id} className={classes.cardContainer}>
            <AppointmentCard appointment={appointment} patient={patient} practitioner={practitioner} />
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;
