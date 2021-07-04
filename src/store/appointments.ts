import { Appointment } from '@prisma/client';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { parseIds } from 'store/utils';
import { SERVER_API_ENDPOINT } from 'store/timeslots';

export const getAppointments = createAsyncThunk('getAppointments', async () => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`);
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment[];
});

export const postAppointment = createAsyncThunk('postAppointment', async (body: string) => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments`, { method: 'POST', body: body });
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment;
});

export const deleteAppointment = createAsyncThunk('deleteAppointment', async (id: number) => {
  const response = await fetch(`${SERVER_API_ENDPOINT}/appointments/${id}`, { method: 'DELETE' });
  const parsedResponse = await response.json();
  return parseIds(parsedResponse) as Appointment;
});

const appointmentsAdapter = createEntityAdapter<Appointment>({
  sortComparer: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
});

export const appointmentsSelectors = appointmentsAdapter.getSelectors();

const appointmentsSlice = createSlice({
  name: 'timeslots',
  initialState: appointmentsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppointments.fulfilled, (state, action) => {
      appointmentsAdapter.setAll(state, action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getAppointments.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(postAppointment.fulfilled, (state, action) => {
      appointmentsAdapter.addOne(state, action.payload);
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      appointmentsAdapter.removeOne(state, action.payload.id);
    });
  },
});

export default appointmentsSlice;
