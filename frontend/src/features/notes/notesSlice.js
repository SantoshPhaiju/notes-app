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

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  if (localStorage.getItem("token")) {
    const response = await axios.post(
      "http://localhost:8000/api/notes/addnote",
      note,
      {
        headers: {
          "auth-token": JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    return response.data;
  }
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  try {
    if (localStorage.getItem("token")) {
      const response = await axios.delete(
        `http://localhost:8000/api/notes/deletenote/${id}`,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
});

export const editNote = createAsyncThunk("notes/editNote", async (newNote) => {
  try {
    const { id } = newNote;
    if (localStorage.getItem("token")) {
      const response = await axios.put(
        `http://localhost:8000/api/notes/updatenote/${id}`,
        newNote,
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    return error.message;
  }
});




const initialState = {
  notes: [],
  status: "idle",
  error: null,
  editStatus: "idle",
  addStatus: "idle",
  deleteStatus: "idle",
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
      })
      .addCase(addNote.pending, (state, action) => {
        state.status = "loading";
        state.addStatus = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.addStatus = "succeded";
        state.status = "succeded";
        const newNote = action.payload.data;
        state.notes = state.notes.concat(newNote);
        setTimeout(() => {
          state.addStatus = "idle";
        }, 5000);
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteNote.pending, (state, action) => {
        state.status = "loading";
        state.deleteStatus = "loading";
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = "succeded";
        state.deleteStatus = "succeded";
        const deletedNote = action.payload.note;
        const newNotes = state.notes.filter((note) => {
          return note._id !== deletedNote._id;
        });
        setTimeout(() => {
          state.deleteStatus = "idle";
        }, 5000);
        state.notes = newNotes;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editNote.pending, (state, action) => {
        state.status = "loading";
        state.editStatus = "loading";
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.status = "succeded";
        state.editStatus = "succeded";
        const { _id } = action.payload.updatedNote;
        const notes = state.notes.filter((note) => note._id !== _id);
        state.notes = [...notes, action.payload.updatedNote];
      })
      .addCase(editNote.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, notesLength } = notesSlice.actions;

export default notesSlice.reducer;
