import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  message: null,
  timeoutId: null,

  setNotification: (message) =>
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }

      const timeoutId = setTimeout(() => {
        set({ message: null, timeoutId: null })
      }, 5000)

      return { message, timeoutId }
    }),

  clearNotification: () =>
    set((state) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return { message: null, timeoutId: null }
    })
}))
