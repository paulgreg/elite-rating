import { FormEvent, useCallback, useRef } from 'react'
import { useDataContext } from '../DataContext'

const PlayerForm = () => {
    const { addTournementPlayer } = useDataContext()
    const nameRef = useRef<HTMLInputElement>(null)
    const scoreRef = useRef<HTMLInputElement>(null)

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            if (nameRef?.current?.value && scoreRef?.current?.value) {
                addTournementPlayer(
                    nameRef.current.value,
                    Number.parseFloat(scoreRef.current.value)
                )

                nameRef.current.value = ''
                scoreRef.current.value = ''
                nameRef.current.focus()
            }
        },
        [addTournementPlayer, nameRef, scoreRef]
    )
    return (
        <form onSubmit={onSubmit} style={{ margin: '.5em auto' }}>
            <fieldset>
                <legend>Add new player</legend>
                <input
                    type="text"
                    ref={nameRef}
                    placeholder="name"
                    required
                    autoFocus
                    style={{ width: '10em' }}
                />
                <input
                    type="number"
                    step="0.01"
                    ref={scoreRef}
                    placeholder="score"
                    required
                    style={{ width: '5em' }}
                />
                <button>Add</button>
            </fieldset>
        </form>
    )
}

export default PlayerForm
