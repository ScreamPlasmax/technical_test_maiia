import { FC } from 'react';
import { ListSubheader, makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';

import { Timeslot } from '@prisma/client';
import { useField } from 'formik';
import { format } from 'date-fns';

type Props = {
  timeslots: Timeslot[];
};

const useStyles = makeStyles(() => ({
  colorPrimary: {
    color: '#3FB0AA',
  },
}));

const TimeslotsSelectField: FC<Props> = (props) => {
  const { timeslots } = props;
  const classes = useStyles();
  const [field, meta] = useField('practitioner');
  const practitionerTimeslots = timeslots.filter((timeslot) => timeslot.practitionerId === field.value);

  // We regroup all the timeslots by date so that we can easily show them in the select
  const timeslotsByDate = practitionerTimeslots.reduce((acc: Record<string, Timeslot[]>, curr) => {
    const timeslotDate = format(new Date(curr.startDate), 'yyyy/MM/dd');
    const datesTimeslots = acc[timeslotDate] || [];
    acc[timeslotDate] = [...datesTimeslots, curr];

    return acc;
  }, {});

  const orderedTimeslots = Object.entries(timeslotsByDate).reduce((acc: ({ date: string } | Timeslot)[], curr) => {
    const [date, timeslots] = curr;

    return [...acc, { date }, ...timeslots];
  }, []);

  return (
    <SelectField
      name="timeslot"
      label="Créneau"
      disabledLabel="Choisissez un créneau"
      disabled={!field.value || (meta.touched && !!meta.error)}
    >
      {orderedTimeslots.map((element) => {
        // Typescript doesn't allow discriminal union arrays. I'm curious to have
        // a real solution to this.
        const el1 = element as { date: string };
        const el2 = element as Timeslot;

        return el1.date ? (
          <ListSubheader key={el1.date} classes={classes} color="primary">
            {format(new Date(el1.date), 'd MMM yyyy')}
          </ListSubheader>
        ) : (
          <MenuItem key={el2.id} value={el2.id}>
            {format(new Date(el2.startDate), 'HH:mm')} - {format(new Date(el2.endDate), 'HH:mm')}
          </MenuItem>
        );
      })}
    </SelectField>
  );
};

export default TimeslotsSelectField;
