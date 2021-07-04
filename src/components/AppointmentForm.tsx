import { Form, Formik } from 'formik';
import Button from 'components/atoms/buttons/Button';
import { makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';
import { useEffect } from 'react';
import { StoreType, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getPractitioners, practitionersSelectors } from 'store/practitioners';
import { Patient, Practitioner } from '@prisma/client';
import { getPatients, patientsSelectors } from 'store/patients';
import TimeslotsSelectField from 'components/atoms/selects/TimeslotsSelectField';
import * as Yup from 'yup';

const initialValues = {
  practitioner: null,
  patient: null,
  timeslot: null,
};

const validationSchema = Yup.object().shape({
  practitioner: Yup.number().nullable().required('Le praticien est requis'),
  patient: Yup.number().nullable().required('Le patient est requis'),
  timeslot: Yup.number().nullable().required('Le timeslot est requis'),
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

  useEffect(() => {
    dispatch(getPractitioners());
    dispatch(getPatients());
  }, []);

  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>
        <h4>Prendre rendez-vous en ligne</h4>
        <p>Veuillez renseigner les informations suivantes</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log(data);
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
          <TimeslotsSelectField />

          <Button type="submit">Valider</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AppointmentForm;
