import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createLeaveRequest,
  getAllLeaves,
  getApprovedLeaves,
  updateLeaveStatus,
} from "../../services/api/leave";

// Async thunks for API calls
export const fetchAllLeaves = createAsyncThunk(
  "leaves/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllLeaves();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch leaves");
    }
  }
);

export const fetchApprovedLeaves = createAsyncThunk(
  "leaves/fetchApproved",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getApprovedLeaves();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "Failed to fetch approved leaves"
      );
    }
  }
);

export const createLeave = createAsyncThunk(
  "leaves/create",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await createLeaveRequest(leaveData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create leave");
    }
  }
);

export const updateLeave = createAsyncThunk(
  "leaves/updateStatus",
  async ({ leaveId, status }, { rejectWithValue }) => {
    try {
      const response = await updateLeaveStatus(leaveId, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update leave status");
    }
  }
);

const initialState = {
  leaves: [],
  approvedLeaves: [],
  selectedLeave: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    setSelectedLeave: (state, action) => {
      state.selectedLeave = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all leaves
      .addCase(fetchAllLeaves.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaves = action.payload;
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch approved leaves
      .addCase(fetchApprovedLeaves.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApprovedLeaves.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvedLeaves = action.payload;
      })
      .addCase(fetchApprovedLeaves.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create leave
      .addCase(createLeave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        state.leaves.unshift(action.payload);
        state.successMessage = "Leave request created successfully";
      })
      .addCase(createLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update leave status
      .addCase(updateLeave.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateLeave.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedLeave = action.payload;
        state.leaves = state.leaves.map((leave) =>
          leave._id === updatedLeave._id ? updatedLeave : leave
        );
        if (updatedLeave.status === "Approved") {
          state.approvedLeaves = [...state.approvedLeaves, updatedLeave];
        } else {
          state.approvedLeaves = state.approvedLeaves.filter(
            (leave) => leave._id !== updatedLeave._id
          );
        }
        state.successMessage = "Leave status updated successfully";
      })
      .addCase(updateLeave.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedLeave, clearError, clearSuccessMessage } =
  leaveSlice.actions;
export default leaveSlice.reducer;
