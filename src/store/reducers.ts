import timeslots from './timeslots';
import practitioners from 'store/practitioners';
import patients from 'store/patients';
import appointmentsSlice from 'store/appointments';

export default {
  timeslots: timeslots.reducer,
  practitioners: practitioners.reducer,
  patients: patients.reducer,
  appointments: appointmentsSlice.reducer,
};
