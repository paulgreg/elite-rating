import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'
import { Player, Players, Tournement } from '../Types'
import PlayersList from './PlayersList'
import PlayerForm from './PlayerForm'

const EditTournement: React.FC<{
    currentTournement: Tournement
    saveTournement: (tournement: Tournement) => void
    deleteTournement: (id: string) => void
}> = ({ currentTournement, saveTournement, deleteTournement }) => {
    const id = currentTournement.id
    const [date, setDate] = useState<string>(currentTournement.date)
    const [name, setName] = useState<string>(currentTournement.name)
    const [players, setPlayers] = useState<Players>(currentTournement.players)

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

    const onSaveClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (!date) {
                alert('Please select a date')
            } else {
                saveTournement({ id, date, name, players })
            }
        },
        [saveTournement, date, name, players]
    )

    const onDeleteClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            e.stopPropagation()
            if (confirm(`Are your sure to remove tournement ${name} ?`)) {
                deleteTournement(id)
            }
        },
        [deleteTournement, id, name]
    )

    const onDateChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            try {
                setDate(e.target.value)
            } catch (error) {
                console.warn('failed to parse date', e.target.value)
            }
        },
        [setDate]
    )
    const onNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
        },
        [setName]
    )

    return (
        <div
            style={{
                width: 'fit-content',
                margin: 'auto',
            }}
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                style={{
                    margin: '.5em auto',
                }}
            >
                <fieldset>
                    <legend>Tournement information</legend>
                    <input
                        type="date"
                        value={date}
                        onChange={onDateChange}
                        required
                    />
                    <input
                        type="text"
                        value={name}
                        placeholder="Tournement name"
                        onChange={onNameChange}
                    />
                </fieldset>
            </form>
            <PlayerForm addPlayer={addPlayer} />
            <PlayersList players={players} delPlayer={delPlayer} />
            <button onClick={onDeleteClick}>delete</button>
            <button onClick={onSaveClick}>save</button>
        </div>
    )
}

export default EditTournement
