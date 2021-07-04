import { Form, Formik } from 'formik';
import Button from 'components/atoms/buttons/Button';
import { makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';

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
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  formContent: {
    padding: '24px 24px 4px 24px',
  },
}));

const AppointmentForm = () => {
  const classes = useStyles();

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
            <MenuItem value="1">Gérard</MenuItem>
            <MenuItem value="2">Emilie</MenuItem>
            <MenuItem value="3">Paul</MenuItem>
          </SelectField>
          <SelectField name="patient" label="Patient" disabledLabel="Choisissez un patient">
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
            <MenuItem value="3">Option 3</MenuItem>
          </SelectField>
          <Button type="submit" variant="FORM">
            Valider
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AppointmentForm;
