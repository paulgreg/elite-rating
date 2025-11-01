import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import settings from './settings.json'
import { DataContext } from './DataContext'
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebsocketProvider } from 'y-websocket'
import { useY } from 'react-yjs'
import { PREFIX } from './constants'
import { slugify } from './utils/string'
import { Tournements, YPlayer, YTournement } from './Types'
import { generateUniqueId } from './utils/id'

interface DataContextProviderPropsType {
    name: string
    children: React.ReactNode | React.ReactNode[]
}

const DataContextProvider: React.FC<DataContextProviderPropsType> = ({
    name,
    children,
}) => {
    const guid = `${PREFIX}:${slugify(name)}`

    const yDoc = useMemo(() => new Y.Doc({ guid }), [guid])
    const yTournements = yDoc.getArray<Y.Map<YTournement>>('tournements')
    const [currentTournementId, setCurrentTournementId] = useState<
        string | undefined
    >()

    const persistence = useRef<IndexeddbPersistence>(null)
    const provider = useRef<WebsocketProvider>(null)

    const yCurrentTournement = currentTournementId
        ? yTournements
              .toArray()
              .find((t) => t.get('id') === currentTournementId)
        : undefined

    const tournementsUnsorted = useY(yTournements) as unknown as Tournements

    const tournements = tournementsUnsorted.toSorted(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    const currentTournement = tournements.find(
        ({ id }) => id === currentTournementId
    )

    useEffect(() => {
        persistence.current = new IndexeddbPersistence(guid, yDoc)
        if (settings.saveOnline && settings.crdtUrl) {
            provider.current = new WebsocketProvider(
                settings.crdtUrl,
                guid,
                yDoc,
                {
                    params: { secret: settings.secret },
                }
            )
            return () => provider.current?.disconnect()
        }
    }, [guid, yDoc])

    const setCurrentTournement = useCallback((tournementId: string) => {
        setCurrentTournementId(tournementId)
    }, [])

    const resetCurrentTournement = useCallback(() => {
        setCurrentTournementId(undefined)
    }, [])

    const duplicateCurrentTournement = useCallback(() => {
        if (!currentTournement) return

        const yPlayers = new Y.Array<Y.Map<YPlayer>>()
        const yP = currentTournement.players.map(({ name, score }) => {
            const yPlayer = new Y.Map<YPlayer>()
            yPlayer.set('id', generateUniqueId())
            yPlayer.set('name', name)
            yPlayer.set('score', score)
            return yPlayer
        })
        yPlayers.push(yP)

        const yTournement = new Y.Map<YTournement>()
        yTournement.set('id', generateUniqueId())
        yTournement.set('name', currentTournement.name)
        yTournement.set('date', currentTournement.date)
        yTournement.set('players', yPlayers)

        yTournements.push([yTournement])
    }, [currentTournement, yTournements])

    const addTournement = useCallback(() => {
        const yTournement = new Y.Map<YTournement>()
        yTournement.set('id', generateUniqueId())
        yTournement.set('name', '')
        yTournement.set('date', new Date().toISOString().split('T')[0])
        yTournement.set('players', new Y.Array<Y.Map<YPlayer>>())
        yTournements.push([yTournement])
    }, [yTournements])

    const deleteTournement = useCallback(
        (tournementId: string) => {
            const idx = yTournements
                .toArray()
                .findIndex((t) => t.get('id') === tournementId)
            if (idx >= 0) {
                yTournements.delete(idx, 1)
            } else {
                console.error('tournement idx not found')
            }
            resetCurrentTournement()
        },
        [resetCurrentTournement, yTournements]
    )

    const updateTournementDate = useCallback(
        (date: string) => {
            if (!yCurrentTournement) return
            yCurrentTournement.set('date', date)
        },
        [yCurrentTournement]
    )

    const updateTournementName = useCallback(
        (name: string) => {
            if (!yCurrentTournement) return
            yCurrentTournement.set('name', name)
        },
        [yCurrentTournement]
    )

    const addTournementPlayer = useCallback(
        (name: string, score: number) => {
            if (!yCurrentTournement) return

            const yPlayer = new Y.Map<YPlayer>()
            yPlayer.set('id', generateUniqueId())
            yPlayer.set('name', name)
            yPlayer.set('score', score)

            const yPlayers = yCurrentTournement.get('players') as Y.Array<
                Y.Map<YPlayer>
            >
            yPlayers?.push([yPlayer])
        },
        [yCurrentTournement]
    )

    const updateTournementPlayerName = useCallback(
        (id: string, name: string) => {
            if (!yCurrentTournement) return
            const yPlayers = yCurrentTournement.get('players') as Y.Array<
                Y.Map<YPlayer>
            >
            const players = yPlayers.toArray()
            const yPlayer = players.find((p) => p.get('id') === id)
            if (yPlayer) {
                yPlayer.set('name', name)
            } else {
                console.error('player not found')
            }
        },
        [yCurrentTournement]
    )

    const updateTournementPlayerScore = useCallback(
        (id: string, score: number) => {
            if (!yCurrentTournement) return
            const yPlayers = yCurrentTournement.get('players') as Y.Array<
                Y.Map<YPlayer>
            >
            const players = yPlayers.toArray()
            const yPlayer = players.find((p) => p.get('id') === id)
            if (yPlayer) {
                yPlayer.set('score', score)
            } else {
                console.error('player not found')
            }
        },
        [yCurrentTournement]
    )

    const deleteTournementPlayer = useCallback(
        (id: string) => {
            if (!yCurrentTournement) return
            const yPlayers = yCurrentTournement.get('players') as Y.Array<
                Y.Map<YPlayer>
            >
            const players = yPlayers.toArray()
            const idx = players.findIndex((p) => p.get('id') === id)
            if (idx >= 0) {
                yPlayers.delete(idx, 1)
            } else {
                console.error('player idx not found')
            }
        },
        [yCurrentTournement]
    )

    const contextValue = useMemo(
        () => ({
            tournements,
            currentTournement,
            addTournement,
            deleteTournement,
            setCurrentTournement,
            resetCurrentTournement,
            duplicateCurrentTournement,
            updateTournementDate,
            updateTournementName,
            addTournementPlayer,
            updateTournementPlayerName,
            updateTournementPlayerScore,
            deleteTournementPlayer,
        }),
        [
            tournements,
            currentTournement,
            addTournement,
            deleteTournement,
            setCurrentTournement,
            resetCurrentTournement,
            duplicateCurrentTournement,
            updateTournementDate,
            updateTournementName,
            addTournementPlayer,
            updateTournementPlayerName,
            updateTournementPlayerScore,
            deleteTournementPlayer,
        ]
    )

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
