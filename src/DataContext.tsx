import { createContext, useContext } from 'react'
import { Tournement, Tournements } from './Types'

export type DataContextType = {
    tournements: Tournements
    currentTournement?: Tournement
    addTournement: () => void
    deleteTournement: (tournementId: string) => void
    setCurrentTournement: (tournementId: string) => void
    resetCurrentTournement: () => void
    updateTournementDate: (date: string) => void
    updateTournementName: (name: string) => void
    addTournementPlayer: (name: string, score: number) => void
    updateTournementPlayerName: (id: string, name: string) => void
    updateTournementPlayerScore: (id: string, score: number) => void
    deleteTournementPlayer: (id: string) => void
}

export const useDataContext = () => useContext(DataContext)

export const DataContext = createContext<DataContextType>({} as DataContextType)
