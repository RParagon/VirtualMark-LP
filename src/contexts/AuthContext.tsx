import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Session, User } from '@supabase/supabase-js'

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get stored auth preferences
        const rememberMe = localStorage.getItem('rememberMe') === 'true'
        const savedEmail = localStorage.getItem('userEmail')

        // Get current session from Supabase
        const { data: { session } } = await supabase.auth.getSession()

        if (session) {
          // Set session and user in state
          setSession(session)
          setUser(session.user)

          // If session exists but rememberMe is false, schedule session cleanup
          if (!rememberMe) {
            localStorage.removeItem('rememberMe')
            localStorage.removeItem('userEmail')
            await supabase.auth.signOut() // This will trigger the auth state change listener
          }
        } else if (rememberMe && savedEmail) {
          // If no session but rememberMe is true, try to recover session
          const { data } = await supabase.auth.refreshSession()
          if (data.session) {
            setSession(data.session)
            setUser(data.session.user)
          } else {
            // If session recovery fails, clean up storage
            localStorage.removeItem('rememberMe')
            localStorage.removeItem('userEmail')
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clean up on error
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('userEmail')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Escuta mudanças de estado de auth (login, logout, etc.)
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null)
        setUser(null)
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('userEmail')
      } else if (session) {
        setSession(session)
        setUser(session.user)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      // Clean up any existing auth data
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('userEmail')

      // Configure session persistence
      await supabase.auth.setSession({
        access_token: '',
        refresh_token: ''
      })

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (!error && data.session) {
        // Set session and user in state
        setSession(data.session)
        setUser(data.session.user)

        // Handle remember me preference
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
          localStorage.setItem('userEmail', email)
          
          // Ensure session persistence in Supabase
          await supabase.auth.setSession(data.session)
        } else {
          // For non-persistent sessions, we'll let the session expire naturally
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('userEmail')
        }
      }

      return { error }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Limpa tudo
      localStorage.removeItem('rememberMe')
      localStorage.removeItem('userEmail')
      setSession(null)
      setUser(null)

      // Força reload para garantir limpeza total do estado
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const value = {
    session,
    user,
    loading,
    signIn,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
