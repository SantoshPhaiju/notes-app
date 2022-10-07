import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () =>{
    const response = await axios.get("http://localhost:8000/api/notes/fetchallnotes", {
        headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTA1MmY1NzlhMTljZDRmY2Q5MjgzNCIsImlhdCI6MTY2NTEyMTM4OSwiZXhwIjoxNjY3NzEzMzg5fQ.FX5lS3uD0B9eQ5nlTIXU6fUld6KGzWWaYz--z9kdPfo",
        }
    });
    return response.data.data;
});


const initialState = {
    notes: [],
    status: "idle",
    error: null
}


const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchNotes.pending, (state, action) =>{
            state.status = "loading";
        })
        .addCase(fetchNotes.fulfilled, (state,action) =>{
            state.status = "succeded";
            const loadedNotes = action.payload.map((note) =>{
                return note;
            })
            state.notes = state.notes.concat(loadedNotes);
        })
        .addCase(fetchNotes.rejected, (state, action) => {
            state.status = "failed";
            state.error = state.error.message;
          })
    }
})



export default notesSlice.reducer;