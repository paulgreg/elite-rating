import { useCallback, useEffect, useState } from 'react'
import { Tournement, Tournements } from './Types'
import EditEvent from './Components/EditTournement'
import { generateUniqueId } from './Utils'
import HistoryLine from './Components/HistoryLine'
import settings from './settings.json'
import './App.css'

const SAVE_KEY = 'tournements.json'

function App() {
    const [tournements, setTournements] = useState<Tournements>([])
    const [currentTournement, setCurrentTournement] =
        useState<Tournement | null>(null)

    const saveOnline = useCallback(
        (data: Tournements) =>
            fetch(`${settings.saveUrl}/${SAVE_KEY}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: `Basic ${settings.authorization}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }),
        []
    )

    useEffect(() => {
        const load = async () => {
            const data = await loadOnline()
            if (data) setTournements(data)
        }
        if (settings.saveOnline) load()
    }, [setTournements])

    const onAddTournement = useCallback(() => {
        setCurrentTournement({
            id: generateUniqueId(),
            name: '',
            date: new Date().toISOString().split('T')[0],
            players: [],
        })
    }, [])

    const deleteTournement = useCallback(
        (id: string) => {
            setTournements((tournements) =>
                tournements.filter((t) => t.id !== id)
            )
            setCurrentTournement(null)
        },
        [setTournements, setCurrentTournement]
    )

    const onSetTournement = useCallback((tournement: Tournement) => {
        setCurrentTournement(tournement)
    }, [])

    const saveTournement = useCallback(
        (tournement: Tournement) => {
            const newTournements = tournements.find(
                ({ id }) => id === tournement.id
            )
                ? tournements.map((t) =>
                      t.id === tournement.id ? tournement : t
                  )
                : tournements.concat(tournement)
            setTournements(newTournements)
            saveOnline(newTournements)
            setCurrentTournement(null)
        },
        [tournements, setCurrentTournement, setTournements, saveOnline]
    )

    const loadOnline = useCallback(
        async () =>
            fetch(`${settings.saveUrl}/${SAVE_KEY}`, {
                headers: {
                    Authorization: `Basic ${settings.authorization}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json() as Promise<Tournements>
                    }
                    return []
                })
                .catch((e) => {
                    console.error(e)
                    alert('error while loading json')
                    return []
                }),
        []
    )

    return (
        <>
            <h1>Elite Rating</h1>
            <HistoryLine
                tournements={tournements}
                onAddTournement={onAddTournement}
                onSetTournement={onSetTournement}
            />
            {currentTournement && (
                <EditEvent
                    currentTournement={currentTournement}
                    saveTournement={saveTournement}
                    deleteTournement={deleteTournement}
                />
            )}
        </>
    )
}

export default App
