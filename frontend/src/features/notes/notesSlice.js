import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  if (localStorage.getItem("token")) {
    const response = await axios.get(
      "http://localhost:8000/api/notes/fetchallnotes",
      {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    return response.data.data;
  }
});

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      state.notes = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.status = "loading";
        state.notes = [];
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeded";
        if (localStorage.getItem("token")) {
          const loadedNotes = action.payload.map((note) => {
            return note;
          });
          state.notes = state.notes.concat(loadedNotes);
        } else {
          state.notes = [];
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { logout } = notesSlice.actions;

export default notesSlice.reducer;
