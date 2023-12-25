import { useCallback, useState } from 'react'
import './App.css'
import Form from './Components/Form'
import Table from './Components/Table'

export type Player = {
    id: string
    name: string
    score: number
}

export type Players = Array<Player>

function App() {
    const [players, setPlayers] = useState<Players>([])

    const addPlayer = useCallback(
        (newPlayer: Player) => {
            setPlayers((players) => players.concat(newPlayer))
        },
        [setPlayers]
    )
    const delPlayer = useCallback(
        (idToRemove: string) => {
            setPlayers((players) =>
                players.filter(({ id }) => id !== idToRemove)
            )
        },
        [setPlayers]
    )

    return (
        <>
            <h1>Elite Rating</h1>
            <Form addPlayer={addPlayer} />
            <Table players={players} delPlayer={delPlayer} />
        </>
    )
}

export default App
