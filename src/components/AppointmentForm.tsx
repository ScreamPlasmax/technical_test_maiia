import { Form, Formik } from 'formik';
import Button from 'components/atoms/buttons/Button';
import { makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';
import { useEffect } from 'react';
import { StoreType, useAppDispatch } from 'store';
import { useSelector } from 'react-redux';
import { getPractitioners, practitionersSelectors } from 'store/practitioners';
import { Practitioner } from '@prisma/client';

const initialValues = {
  practitioner: null,
  patient: null,
};

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
  practitionerSpecialty: {
    color: '#3FB0AA',
  },
}));

const AppointmentForm = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const practitioners = useSelector<StoreType, Practitioner[]>((state) =>
    practitionersSelectors.selectAll(state.practitioners),
  );

  useEffect(() => {
    dispatch(getPractitioners());
  }, []);

  return (
    <div className={classes.form}>
      <div className={classes.formTitle}>
        <h4>Prendre rendez-vous en ligne</h4>
        <p>Veuillez renseigner les informations suivantes</p>
      </div>
      <Formik
        initialValues={initialValues}
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
                <span className={classes.practitionerSpecialty}>{practitioner.speciality}</span>
              </MenuItem>
            ))}
          </SelectField>
          <SelectField name="patient" label="Patient" disabledLabel="Choisissez un patient">
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
            <MenuItem value="3">Option 3</MenuItem>
          </SelectField>
          <Button type="submit">Valider</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AppointmentForm;
