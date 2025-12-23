import { MouseEvent, useRef, useState } from 'react'
import { Player } from '../Types'
import { useDataContext } from '../DataContext'

const Row: React.FC<{
    player: Player
    position: number
}> = ({ player, position }) => {
    const { deleteTournementPlayer, updateTournementPlayer } = useDataContext()

    const nameRef = useRef<HTMLInputElement>(null)
    const scoreRef = useRef<HTMLInputElement>(null)
    const [hasChanged, setHasChanged] = useState(false)

    const onTraskClick =
        (player: Player) => (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (confirm(`Are you sure to delete ${player.name} ?`)) {
                deleteTournementPlayer(player.id)
            }
        }

    const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        const name = nameRef.current?.value ?? ''
        const score = Number.parseFloat(scoreRef.current?.value ?? '0')
        updateTournementPlayer(player.id, name, score)
        setHasChanged(false)
    }

    return (
        <>
            <span style={{ fontWeight: 'bold' }}>{position + 1}</span>
            <span>
                <input
                    type="text"
                    placeholder="name"
                    ref={nameRef}
                    required
                    style={{ width: '10em' }}
                    defaultValue={player.name}
                    onChange={() => setHasChanged(true)}
                />
            </span>
            <span>
                <input
                    type="number"
                    step="0.01"
                    placeholder="score"
                    ref={scoreRef}
                    required
                    style={{ width: '5em' }}
                    defaultValue={player.score}
                    onChange={() => setHasChanged(true)}
                />
            </span>
            <button
                style={{ cursor: 'pointer' }}
                onClick={onSaveClick}
                disabled={!hasChanged}
            >
                ✅ save
            </button>
            <button
                style={{ cursor: 'pointer' }}
                onClick={onTraskClick(player)}
            >
                🗑️
            </button>
        </>
    )
}

const PlayersList = () => {
    const { currentTournement } = useDataContext()
    if (!currentTournement?.players?.length) return <></>

    const players = currentTournement.players.toSorted(
        (p1, p2) => p2.score - p1.score
    )
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                margin: '1em auto',
                border: '2px solid gold',
                padding: '.5em',
            }}
        >
            {players.map((player, idx) => (
                <Row
                    key={`${idx}-${player?.name}`}
                    player={player}
                    position={idx}
                />
            ))}
        </div>
    )
}

export default PlayersList
