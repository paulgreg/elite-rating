import { MouseEvent, useCallback } from 'react'
import { Player } from '../Types'
import { useDataContext } from '../DataContext'

const Row: React.FC<{
    player: Player
    position: number
}> = ({ player, position }) => {
    const {
        deleteTournementPlayer,
        updateTournementPlayerName,
        updateTournementPlayerScore,
    } = useDataContext()

    const onTraskClick = useCallback(
        (player: Player) => (e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation()
            if (confirm(`Are you sure to delete ${player.name} ?`)) {
                deleteTournementPlayer(player.id)
            }
        },
        [deleteTournementPlayer]
    )

    const onNameChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const name = e.target.value
            updateTournementPlayerName(player.id, name)
        },
        [player.id, updateTournementPlayerName]
    )
    const onScoreChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const score = e.target.value ?? '0'
            updateTournementPlayerScore(player.id, Number.parseFloat(score))
        },
        [player.id, updateTournementPlayerScore]
    )

    return (
        <>
            <span style={{ fontWeight: 'bold' }}>{position + 1}</span>
            <span>
                <input
                    type="text"
                    placeholder="name"
                    required
                    style={{ width: '10em' }}
                    defaultValue={player.name}
                    onBlur={onNameChange}
                />
            </span>
            <span>
                <input
                    type="number"
                    step="0.01"
                    placeholder="score"
                    required
                    style={{ width: '5em' }}
                    defaultValue={player.score}
                    onBlur={onScoreChange}
                />
            </span>
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
                gridTemplateColumns: '1fr 2fr 1fr 1fr',
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
