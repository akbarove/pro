import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_API = "http://localhost:8007/users";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const { data } = await axios.get(USERS_API);
  return data;
});

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user) => {
    await axios.post(USERS_API, user);
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (id) => {
    const { data } = await axios.get(`${USERS_API}/${id}`);
    return data;
  }
);

export const getOneUser = createAsyncThunk("users/getOneUser", async (id) => {
  const { data } = await axios.get(`${USERS_API}/${id}`);
  return data;
});

export const createPost = createAsyncThunk(
  "users/createPost",
  async ({ user, post }, { dispatch }) => {
    const updatedPosts = [...user.posts, post];
    await axios.patch(`${USERS_API}/${user.id}`, { posts: updatedPosts });
    dispatch(getCurrentUser(user.id));
  }
);

export const handleLike = createAsyncThunk(
  "users/handleLike",
  async ({ user, postId, operation }, { dispatch }) => {
    const updatedPosts = {
      ...user,
      posts: user.posts.map((item) => {
        if (operation === "minus") {
          return postId === item.id ? { ...item, likes: item.likes - 1 } : item;
        } else {
          return postId === item.id ? { ...item, likes: item.likes + 1 } : item;
        }
      }),
    };
    await axios.patch(`${USERS_API}/${user.id}`, updatedPosts);
    dispatch(getOneUser(user.id));
  }
);

export const createComment = createAsyncThunk(
  "users/createComment",
  async ({ user, postId, author, comment }, { dispatch }) => {
    const updatedPosts = {
      ...user,
      posts: user.posts.map((item) => {
        if (item.id === postId) {
          return {
            ...item,
            comments: [...item.comments, { author, comment }],
          };
        } else {
          return item;
        }
      }),
    };

    await axios.patch(`${USERS_API}/${user.id}`, updatedPosts);
    dispatch(getOneUser(user.id));
  }
);

export const editProfile = createAsyncThunk(
  "users/editProfile",
  async ({ user, id }, { dispatch }) => {
    console.log(user);
    await axios.patch(`${USERS_API}/${id}`, {
      profileImage: user.profileImage,
      backgroundImage: user.backgroundImage,
      username: user.username,
      password: user.password,
      email: user.email,
      description: user.description,
    });
    dispatch(getCurrentUser(id));
  }
);
