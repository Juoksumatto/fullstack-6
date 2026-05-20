import { create } from 'zustand'

export const useCounterStore = create(set => ({
    countgood: 0,
    countbad: 0,
    countneutral: 0,
    good: () => set((state) => ({ countgood: state.countgood + 1 })),
    neutral: () => set((state) => ({ countneutral: state.countneutral + 1 })),
    bad: () => set((state) => ({ countbad: state.countbad + 1 })),
}))