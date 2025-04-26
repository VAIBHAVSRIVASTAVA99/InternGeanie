"use client"
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

// 1. Define the shape of your context value
interface AuthContextType {
  token: string | null
  isLoggedIn: boolean
  AuthorizationToken: string
  storeTokenInLS: (token: string) => void
  logoutUser: () => void
  loading: boolean
}

// 2. Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 3. Provider Props
interface AuthProviderProps {
  children: ReactNode
}

// 4. AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const isLoggedIn = !!token
  const AuthorizationToken = `Bearer ${token}`

  const storeTokenInLS = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  const logoutUser = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, isLoggedIn, AuthorizationToken, storeTokenInLS, logoutUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

// 5. Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
