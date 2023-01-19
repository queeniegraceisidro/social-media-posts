import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export interface IUser {
  id: string
  name: string
}
export interface IUsers extends Array<IUser> { }


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})


const initialState: IUsers = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export default usersSlice.reducer