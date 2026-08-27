import { signInWithGoogle } from '@/shared/libs'

export const signInWithGoogleHandler = async (redirectPath: string = '/') => {
    try {
        await signInWithGoogle(redirectPath)
    } catch (error) {
        console.error('Error signing in with Google:', error)
    }
}