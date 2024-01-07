import { useCallback, useEffect, useState } from 'react'
import { Tournement, Tournements } from './Types'
import EditEvent from './Components/EditTournement'
import { generateUniqueId } from './Utils'
import HistoryLine from './Components/HistoryLine'
import settings from './settings.json'
import Filename from './Components/Filename'
import './App.css'

function App() {
    const [filename, setFilename] = useState('')
    const [tournements, setTournements] = useState<Tournements>([])
    const [currentTournement, setCurrentTournement] = useState<
        Tournement | undefined
    >()

    const onLoadFilename = useCallback(
        (name: string) => {
            setFilename(name)
        },
        [setFilename]
    )

    const saveOnline = useCallback(
        (name: string, data: Tournements) => {
            if (name.length === 0) return Promise.resolve({})
            return fetch(`${settings.saveUrl}/${name}.json`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Authorization: `Basic ${settings.authorization}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        },
        [filename]
    )

    useEffect(() => {
        const load = async (name: string) => {
            const data = await loadOnline(name)
            if (data) setTournements(data)
        }
        if (filename.length > 0) load(filename)
    }, [filename, setTournements])

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
            const newTournements = tournements.filter((t) => t.id !== id)
            setTournements(newTournements)
            saveOnline(filename, newTournements)
            setCurrentTournement(undefined)
        },
        [filename, tournements, setTournements, setCurrentTournement]
    )

    const onSetTournement = useCallback(
        (tournementId: string) => {
            setCurrentTournement(
                tournements.find(({ id }) => tournementId === id)
            )
        },
        [tournements]
    )

    const resetTournement = useCallback(() => {
        setCurrentTournement(undefined)
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
            saveOnline(filename, newTournements)
            setCurrentTournement(undefined)
        },
        [
            filename,
            tournements,
            setCurrentTournement,
            setTournements,
            saveOnline,
        ]
    )

    const loadOnline = useCallback(
        async (name: string) => {
            if (name.length === 0) return Promise.resolve([])
            return fetch(`${settings.saveUrl}/${name}.json`, {
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
                })
        },
        [filename]
    )

    return (
        <>
            <h1>Elite Rating</h1>
            <Filename onLoadFilename={onLoadFilename} />
            {filename.length > 0 && (
                <HistoryLine
                    tournements={tournements}
                    onAddTournement={onAddTournement}
                    onSetTournement={onSetTournement}
                />
            )}
            {currentTournement && (
                <EditEvent
                    currentTournement={currentTournement}
                    saveTournement={saveTournement}
                    deleteTournement={deleteTournement}
                    resetTournement={resetTournement}
                />
            )}
        </>
    )
}

export default App
