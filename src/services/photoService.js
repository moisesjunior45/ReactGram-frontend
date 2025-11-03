import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(`${api}/photos`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/user/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Delete a photo
const deletePhoto = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Update a photo
const updatePhoto = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Get a photo by id
const getPhoto = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

//  Like a photo
const like = async (id, token) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(`${api}/photos/like/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Toggle like (like or unlike)
const toggleLike = async (photoId, hasLiked, token) => {
  const config = requestConfig("PUT", null, token);

  const endpoint = hasLiked
    ? `${api}/photos/unlike/${photoId}`
    : `${api}/photos/like/${photoId}`;

  try {
    const res = await fetch(endpoint, config);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.errors?.[0] || "Erro ao curtir/descurtir");
    }

    return result;
  } catch (error) {
    console.error("Erro no toggleLike:", error.message);
    return { errors: [error.message] };
  }
};

// Add comment to a photo
const comment = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/photos/comment/${id}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Get all photos
const getPhotos = async (token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Search photo by title
const searchPhotos = async (query, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/search?q=${query}`, config);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getPhotos,
  searchPhotos,
  toggleLike,
};

export default photoService;
