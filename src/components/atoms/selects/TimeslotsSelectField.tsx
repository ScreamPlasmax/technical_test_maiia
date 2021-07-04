import { FC, useEffect } from 'react';
import { ListSubheader, makeStyles, MenuItem } from '@material-ui/core';
import SelectField from 'components/atoms/selects/SelectField';
import { getTimeSlots, timeslotsSelectors } from 'store/timeslots';
import { useSelector } from 'react-redux';
import { StoreType, useAppDispatch } from 'store';
import { Timeslot } from '@prisma/client';
import { useField } from 'formik';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: '#3FB0AA',
  },
}));

const TimeslotsSelectField: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [field, meta] = useField('practitioner');
  const timeslots = useSelector<StoreType, Timeslot[]>((state) => timeslotsSelectors.selectAll(state.timeslots));
  const practitionerTimeslots = timeslots.filter((timeslot) => timeslot.practitionerId === field.value);

  // We regroup all the timeslots by date so that we can easily show them in the select
  const timeslotsByDate = practitionerTimeslots.reduce((acc: Record<string, Timeslot[]>, curr) => {
    const timeslotDate = format(new Date(curr.startDate), 'yyyy/MM/dd');
    const datesTimeslots = acc[timeslotDate] || [];
    return { ...acc, [timeslotDate]: [...datesTimeslots, curr] };
  }, {});

  const orderedTimeslots = Object.entries(timeslotsByDate).reduce((acc: ({ date: string } | Timeslot)[], curr) => {
    const [date, timeslots] = curr;

    return [...acc, { date }, ...timeslots];
  }, []);

  useEffect(() => {
    dispatch(getTimeSlots());
  }, []);

  return (
    <SelectField
      name="timeslot"
      label="Timeslot"
      disabledLabel="Choisissez un créneau"
      disabled={!field.value || (meta.touched && !!meta.error)}
    >
      {orderedTimeslots.map((element) => {
        return element.date ? (
          <ListSubheader key={element.date} classes={classes} color="primary">
            {format(new Date(element.date), 'd MMM yyyy')}
          </ListSubheader>
        ) : (
          <MenuItem key={element.id} value={element.id}>
            {format(new Date(element.startDate), 'HH:mm')} - {format(new Date(element.endDate), 'HH:mm')}
          </MenuItem>
        );
      })}
      {/*{Object.entries(timeslotsByDate).map(([date, timeslots]) => (*/}
      {/*  <div key={date}>*/}
      {/*    <ListSubheader classes={classes} color="primary">*/}
      {/*      {format(new Date(date), 'd MMM yyyy')}*/}
      {/*    </ListSubheader>*/}
      {/*    {timeslots.map((timeslot) => (*/}
      {/*      <MenuItem key={timeslot.id} value={timeslot.id}>*/}
      {/*        {format(new Date(timeslot.startDate), 'HH:mm')} - {format(new Date(timeslot.endDate), 'HH:mm')}*/}
      {/*      </MenuItem>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*))}*/}
    </SelectField>
  );
};

export default TimeslotsSelectField;
