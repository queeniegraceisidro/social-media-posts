import { createSlice } from '@reduxjs/toolkit'

interface IUser {
  id: string
  name: string
}
export interface IUsers extends Array<IUser> { }

const initialState: IUsers = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export default usersSlice.reducer