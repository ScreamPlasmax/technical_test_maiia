import timeslots from './timeslots';
import practitioners from 'store/practitioners';
import patients from 'store/patients';

export default {
  timeslots: timeslots.reducer,
  practitioners: practitioners.reducer,
  patients: patients.reducer,
};
