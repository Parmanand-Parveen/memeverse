import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface MemeState {
  memes: any[]; // Changed from [] to any[] for type safety
  loading: boolean;
  error: string | null;
}

const initialState: MemeState = {
  memes: [],
  loading: false,
  error: null,
};

export const fetchMeme = createAsyncThunk("meme/fetchMeme", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("https://api.memegen.link/templates");
    return response.data; // Return the data to be used as payload
  } catch (error: any) {
    return rejectWithValue(error.response?.data || "Failed to fetch memes");
  }
});

const MemeSlice = createSlice({
  name: "meme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeme.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload;
      })
      .addCase(fetchMeme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default MemeSlice.reducer;
