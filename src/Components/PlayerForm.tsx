import { FormEvent, useCallback, useEffect, useRef } from 'react'
import { generateUniqueId } from '../Utils'
import { Player } from '../Types'

const PlayerForm: React.FC<{
    addOrEditPlayer: (newPlayer: Player) => void
    currentPlayer?: Player
}> = ({ addOrEditPlayer, currentPlayer }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const scoreRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (currentPlayer && nameRef.current && scoreRef.current) {
            nameRef.current.value = currentPlayer.name
            scoreRef.current.value = String(currentPlayer.score)
        }
    }, [currentPlayer, nameRef, scoreRef])

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            if (nameRef?.current?.value && scoreRef?.current?.value) {
                if (currentPlayer?.id) {
                    const existingPlayer: Player = {
                        ...currentPlayer,
                        name: nameRef.current.value,
                        score: parseFloat(scoreRef.current.value),
                    }
                    addOrEditPlayer(existingPlayer)
                } else {
                    const newPlayer: Player = {
                        id: generateUniqueId(),
                        name: nameRef.current.value,
                        score: parseFloat(scoreRef.current.value),
                    }
                    addOrEditPlayer(newPlayer)
                }

                nameRef.current.value = ''
                scoreRef.current.value = ''
                nameRef.current.focus()
            }
        },
        [currentPlayer, nameRef, scoreRef]
    )
    return (
        <form onSubmit={onSubmit} style={{ margin: '.5em auto' }}>
            <fieldset>
                <legend>{currentPlayer?.id ? 'Edit' : 'Add'} player</legend>

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
                <button>save</button>
            </fieldset>
        </form>
    )
}

export default PlayerForm
