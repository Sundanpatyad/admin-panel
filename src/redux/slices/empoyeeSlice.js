import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  deleteEmployee as deleteEmployeeApi,
  getAllEmployees,
  updateEmployee as updateEmployeeApi,
} from "../../services/api/employee";

// Async thunk for fetching all employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = await getAllEmployees();
    console.log(data, "employeeData");
    return data;
  }
);

// Async thunk for adding an employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData) => {
    const data = await createEmployee(employeeData);
    return data;
  }
);

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, data }) => {
    const response = await updateEmployeeApi(id, data);
    return response;
  }
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    const response = await deleteEmployeeApi(id);
    return response.data; // Now returning the full response data
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchEmployees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload, "action.payload");
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle addEmployee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Handle updateEmployee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (emp) => emp.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      // Handle deleteEmployee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        console.log(action.payload, "action.payload");
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload._id
        );
      });
  },
});

export default employeeSlice.reducer;
