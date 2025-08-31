import { MouseEvent, useCallback } from 'react'
import { Player, Players } from '../Types'

const Row: React.FC<{
    player: Player
    position: number
    delPlayer: (id: string) => void
    editPlayer: (player: Player) => void
}> = ({ player, position, delPlayer, editPlayer }) => {
    const onTraskClick = useCallback(
        (player: Player) => (e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation()
            if (confirm(`Are you sure to delete ${player.name} ?`)) {
                delPlayer(player.id)
            }
        },
        [delPlayer]
    )
    const onEditClick = useCallback(
        (player: Player) => (e: MouseEvent<HTMLSpanElement>) => {
            e.stopPropagation()
            editPlayer(player)
        },
        [editPlayer]
    )
    return (
        <>
            <span style={{ fontWeight: 'bold' }}>{position + 1}</span>
            <span>{player.name}</span>
            <span>{player.score}</span>
            <span style={{ cursor: 'pointer' }} onClick={onEditClick(player)}>
                ✏️
            </span>
            <span style={{ cursor: 'pointer' }} onClick={onTraskClick(player)}>
                🗑️
            </span>
        </>
    )
}

const PlayersList: React.FC<{
    players: Players
    delPlayer: (id: string) => void
    editPlayer: (player: Player) => void
}> = ({ players, delPlayer, editPlayer }) => {
    if (!players?.length) return <></>
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
            {players
                .sort((p1, p2) => p2.score - p1.score)
                .map((player, idx) => (
                    <Row
                        key={idx}
                        player={player}
                        position={idx}
                        delPlayer={delPlayer}
                        editPlayer={editPlayer}
                    />
                ))}
        </div>
    )
}

export default PlayersList
