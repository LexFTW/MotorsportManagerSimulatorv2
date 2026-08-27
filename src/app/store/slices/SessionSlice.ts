import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Session, User } from '@supabase/supabase-js'

export interface SessionState {
  session: Session | null
  user: User | null
  isLoading: boolean
}

const initialState: SessionState = {
  session: null,
  user: null,
  isLoading: true,
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload
      state.user = action.payload?.user ?? null
      state.isLoading = false
    },
  },
})

export const { setSession } = sessionSlice.actions
export const sessionReducer = sessionSlice.reducer