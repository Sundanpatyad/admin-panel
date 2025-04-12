import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllAttendance,
  updateAttendance as updateAttendanceAPI,
} from "../../services/api/attandance";

export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllAttendance();
      return response.attendance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAttendance = createAsyncThunk(
  "attendance/updateAttendance",
  async ({ employeeId, status, task }, { rejectWithValue }) => {
    try {
      const response = await updateAttendanceAPI({ employeeId, status, task });
      return { ...response.attendance, employeeId }; // Include employeeId in the response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendance: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateAttendance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.attendance = state.attendance.map((item) =>
          item._id === action.payload.employeeId
            ? { ...item, status: action.payload.status, task: action.payload.task }
            : item
        );
        state.status = "succeeded";
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
