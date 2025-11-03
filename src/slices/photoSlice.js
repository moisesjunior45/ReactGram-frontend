import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish user photo
export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
  "photo/getUserPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);

    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Update a photo
export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get photo by id
export const getPhoto = createAsyncThunk(
  "photo/getPhoto",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getPhoto(id, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Like a photo
export const like = createAsyncThunk(
  "photo/like",
  async ({ photoId, hasLiked }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.toggleLike(photoId, hasLiked, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// comment a photo
export const comment = createAsyncThunk(
  "photo/comment",
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.comment(
      { comment: commentData.comment },
      commentData.id,
      token
    );

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Get all photos
export const getPhotos = createAsyncThunk(
  "photo/getall",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotos(token);

    return data;
  }
);

// Search photo by title
export const searchPhotos = createAsyncThunk(
  "photo/search",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchPhotos(query, token);

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto publicada com sucesso!";
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.meta.arg
        );
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photos.map((photo) => {
          if (photo._id === action.payload._id) {
            return (photo.title = action.payload.photo.title);
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        const payload = action.payload;
        if (!payload || !payload.userId || !payload.photoId) return;

        const { userId, photoId, removed } = payload;

        if (state.photo._id === photoId) {
          state.photo.likes = removed
            ? state.photo.likes.filter((id) => id !== userId)
            : [...state.photo.likes, userId];
        }

        state.photos = state.photos.map((photo) => {
          if (photo._id === photoId) {
            photo.likes = removed
              ? photo.likes.filter((id) => id !== userId)
              : [...photo.likes, userId];
          }
          return photo;
        });

        state.message = payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        console.log("Comentário recebido:", action.payload.comment);
        state.photo.comments.push(action.payload.comment);

        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
