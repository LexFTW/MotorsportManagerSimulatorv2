import { useEffect, type PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '@/shared/api/auth'
import { setSession } from '@app/store'

export function SessionProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setSession(session))
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session))
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  return <>{children}</>
}