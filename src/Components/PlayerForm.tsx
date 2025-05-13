import { FormEvent, useCallback, useRef } from 'react'
import { generateUniqueId } from '../Utils'
import { Player } from '../Types'

const PlayerForm: React.FC<{
    addPlayer: (newPlayer: Player) => void
}> = ({ addPlayer }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const scoreRef = useRef<HTMLInputElement>(null)

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            if (nameRef?.current?.value && scoreRef?.current?.value) {
                const newPlayer: Player = {
                    id: generateUniqueId(),
                    name: nameRef.current.value,
                    score: parseFloat(scoreRef.current.value),
                }
                addPlayer(newPlayer)
                nameRef.current.value = ''
                scoreRef.current.value = ''
                nameRef.current.focus()
            }
        },
        [nameRef, scoreRef]
    )
    return (
        <form onSubmit={onSubmit} style={{ margin: '.5em auto' }}>
            <fieldset>
                <legend>Add player</legend>

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
                <button>add</button>
            </fieldset>
        </form>
    )
}

export default PlayerForm
