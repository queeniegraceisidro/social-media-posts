import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

// Define a type for the slice state
interface IPostItem {
  user: string
  date: any
  id: string
  title: string
  content: string
  reactions: any
}

interface IPostItems extends Array<IPostItem> { }

const initialState: IPostItems = [
  {
    id: "1", user: "1", date: sub(new Date(), { minutes: 10 }).toISOString(),
    title: "First Post!", content: "Hello!", reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
  {
    id: "2", user: "2", date: sub(new Date(), { minutes: 5 }).toISOString(),
    title: "Second Post", content: "More text", reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
  },
];

// const initialState = [
//   { id: "1", title: "First Post!", content: "Hello!" },
//   { id: "2", title: "Second Post", content: "More text" },
// ];

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
        state.push(action.payload)
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
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  }
});
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;