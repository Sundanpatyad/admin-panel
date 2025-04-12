import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCandidate,
  deleteCandidate,
  getCandidate,
  getCandidates,
  updateCandidate,
} from "../../services/api/candidate";

// Async thunks
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async (_, { rejectWithValue }) => {
    try {
      return await getCandidates();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCandidate = createAsyncThunk(
  "candidates/fetchCandidate",
  async (id, { rejectWithValue }) => {
    try {
      return await getCandidate(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (candidateData, { rejectWithValue }) => {
    try {
      return await createCandidate(candidateData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editCandidate = createAsyncThunk(
  "candidates/editCandidate",
  async ({ id, candidateData }, { rejectWithValue }) => {
    try {
      const response = await updateCandidate(id, candidateData);
      return response; // Now returning the entire response which includes { success, data }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCandidate = createAsyncThunk(
  "candidates/removeCandidate",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCandidate(id);
      return { id, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  candidates: [],
  currentCandidate: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    clearCurrentCandidate: (state) => {
      state.currentCandidate = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all candidates
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = action.payload.data || [];
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch candidates";
      })

      // Fetch single candidate
      .addCase(fetchCandidate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCandidate = action.payload.candidate;
      })
      .addCase(fetchCandidate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch candidate";
      })

      // Add new candidate
      .addCase(addCandidate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.candidates.unshift(action.payload.data);
      })
      .addCase(addCandidate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to add candidate";
      })

      // Edit candidate
      .addCase(editCandidate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCandidate = action.payload.data; // Access the data property from response
        const index = state.candidates.findIndex(
          (candidate) => candidate._id === updatedCandidate._id
        );
        if (index !== -1) {
          state.candidates[index] = updatedCandidate;
        }
        if (state.currentCandidate?._id === updatedCandidate._id) {
          state.currentCandidate = updatedCandidate;
        }
      })
      .addCase(editCandidate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to update candidate";
      })

      // Remove candidate
      .addCase(removeCandidate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidates = state.candidates.filter(
          (candidate) => candidate._id !== action.payload.id
        );
        if (state.currentCandidate?._id === action.payload.id) {
          state.currentCandidate = null;
        }
      })
      .addCase(removeCandidate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to delete candidate";
      });
  },
});

export const { clearCurrentCandidate, clearError } = candidateSlice.actions;

export default candidateSlice.reducer;
