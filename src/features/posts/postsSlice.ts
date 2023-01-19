import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

// Define a type for the slice state
interface IPostItem {
  user: string;
  date: any;
  id: string
  title: string
  content: string
}

interface IPostItems extends Array<IPostItem>{}

const initialState: IPostItems = [];

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
  reducers : {
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
            user: post.userId
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
    }
  }
});
export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;