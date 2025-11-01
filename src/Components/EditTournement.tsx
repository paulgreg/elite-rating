import { ChangeEvent, MouseEvent, useCallback } from 'react'
import PlayersList from './PlayersList'
import PlayerForm from './PlayerForm'
import { useDataContext } from '../DataContext'

const EditTournement = () => {
    const {
        currentTournement,
        resetCurrentTournement,
        duplicateCurrentTournement,
        deleteTournement,
        updateTournementDate,
        updateTournementName,
    } = useDataContext()
    const id = currentTournement?.id ?? ''
    const date = currentTournement?.date ?? ''
    const name = currentTournement?.name ?? ''

    const onCloseClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            e.stopPropagation()
            resetCurrentTournement()
        },
        [resetCurrentTournement]
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
                updateTournementDate(e.target.value)
            } catch (error) {
                console.warn('failed to parse date', e.target.value, error)
            }
        },
        [updateTournementDate]
    )
    const onNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updateTournementName(e.target.value)
        },
        [updateTournementName]
    )
    if (!currentTournement) return <></>

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
            <button onClick={duplicateCurrentTournement}>duplicate</button>
            <PlayerForm />
            <PlayersList />
            <button onClick={onDeleteClick}>🗑️ delete</button>
            <button onClick={onCloseClick}>✖️ close</button>
        </div>
    )
}

export default EditTournement
