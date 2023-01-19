import { PayloadAction, createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { IUsers } from "../users/usersSlice";
import { client } from '../../api/client'


// Define a type for the slice state
export interface IPostItem {
  user: string
  date: any
  id: string
  title: string
  content: string
  reactions: any
}

interface IPostItems extends Array<IPostItem> { }


interface IPostInitialState {
  posts: IPostItems
  status: string
  error: any
}


const initialState: IPostInitialState = {
  posts: [],
  status: 'idle',
  error: null
}

// const initialState: IPostItems = [
//   {
//     id: "1", user: "1", date: sub(new Date(), { minutes: 10 }).toISOString(),
//     title: "First Post!", content: "Hello!", reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//   },
//   {
//     id: "2", user: "2", date: sub(new Date(), { minutes: 5 }).toISOString(),
//     title: "Second Post", content: "More text", reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//   },
// ];


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})


export const postsSlice = createSlice({
  // Remember: reducer functions must always create new state values immutably, by making copies!
  // It's safe to call mutating functions like Array.push() or modify object fields like
  // state.someField = someValue inside of createSlice(), because it converts those mutations
  // into safe immutable updates internally using the Immer library,
  // but don't try to mutate any data outside of createSlice!
  name: "posts",
  initialState: initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPostItem>) {
        state.posts.push(action.payload)
      },
      prepare(post) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title: post.title,
            content: post.content,
            user: post.userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state: { posts: IPostInitialState }) => state.posts.posts

export const selectPostById = (state: { posts: IPostInitialState; users: IUsers }, postId: string) =>
  state.posts.posts.find(post => post.id === postId)
