import { createContext, useState, useCallback, useContext } from 'react'

export const NotificationContext = createContext(null)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const showNotification = useCallback((msg) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setMessage(msg)

    const newTimeoutId = setTimeout(() => {
      setMessage(null)
      setTimeoutId(null)
    }, 5000)

    setTimeoutId(newTimeoutId)
  }, [timeoutId])

  const clearNotification = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setMessage(null)
    setTimeoutId(null)
  }, [timeoutId])

  const value = {
    message,
    showNotification,
    clearNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
