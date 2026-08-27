import type { RootState } from '@/app/store'

export const selectSession = (state: RootState) => state.session.session
export const selectUser = (state: RootState) => state.session.user

export const selectIsAuthenticated = (state: RootState) =>
  !!state.session.user

export const selectUserAvatarUrl = (state: RootState) => {
  const metadata = state.session.user?.user_metadata
  return metadata?.avatar_url ?? metadata?.picture ?? null
}

export const selectUserDisplayName = (state: RootState) =>
  state.session.user?.user_metadata?.full_name ??
  state.session.user?.email ??
  ''