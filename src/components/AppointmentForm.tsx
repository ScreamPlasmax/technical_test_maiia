import { Form, Formik } from 'formik';
import Button from 'components/atoms/buttons/Button';
import { makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';
import { StoreType, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { practitionersSelectors } from 'store/practitioners';
import { Patient, Practitioner, Timeslot } from '@prisma/client';
import { patientsSelectors } from 'store/patients';
import TimeslotsSelectField from 'components/atoms/selects/TimeslotsSelectField';
import * as Yup from 'yup';
import { timeslotsSelectors } from 'store/timeslots';
import { postAppointment } from 'store/appointments';

const initialValues = {
  practitioner: null,
  patient: null,
  timeslot: null,
};

const validationSchema = Yup.object().shape({
  practitioner: Yup.number().nullable().required('Le praticien est requis'),
  patient: Yup.number().nullable().required('Le patient est requis'),
  timeslot: Yup.number().nullable().required('Le créneau est requis'),
});

const useStyles = makeStyles((theme) => ({
  form: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 600,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  formTitle: {
    padding: '8px 16px',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  formContent: {
    padding: '24px',
  },
  formActions: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  menuItemRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  optionSideInformation: {
    color: '#3FB0AA',
  },
}));

const AppointmentForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const practitioners = useSelector<StoreType, Practitioner[]>((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );
  const patients = useSelector<StoreType, Patient[]>((state) => patientsSelectors.selectAll(state.patients));
  const timeslots = useSelector<StoreType, Timeslot[]>((state) => timeslotsSelectors.selectAll(state.timeslots));

  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>
        <h4>Prendre rendez-vous en ligne</h4>
        <p>Veuillez renseigner les informations suivantes</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          const selectedTimeslot = timeslots.find((timeslot) => timeslot.id === data.timeslot);

          if (!selectedTimeslot) {
            return;
          }
          const body = {
            patientId: data.patient,
            practitionerId: data.practitioner,
            startDate: selectedTimeslot.startDate,
            endDate: selectedTimeslot.endDate,
          };

          dispatch(postAppointment(JSON.stringify(body)));
          resetForm();
        }}
      >
        <Form className={classes.formContent}>
          <SelectField name="practitioner" label="Pratitien" disabledLabel="Choisissez un praticien">
            {practitioners.map((practitioner) => (
              <MenuItem key={practitioner.id} value={practitioner.id} classes={{ root: classes.menuItemRoot }}>
                <span>
                  {practitioner.firstName} {practitioner.lastName}
                </span>
                <span className={classes.optionSideInformation}>{practitioner.speciality}</span>
              </MenuItem>
            ))}
          </SelectField>
          <SelectField name="patient" label="Patient" disabledLabel="Choisissez un patient">
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {`${patient.firstName} ${patient.lastName}`}
              </MenuItem>
            ))}
          </SelectField>
          <TimeslotsSelectField timeslots={timeslots} />

          <div className={classes.formActions}>
            <Button type="submit">Valider</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AppointmentForm;
