import { FormEvent, useCallback, useRef } from 'react'
import { Player } from '../App'
import { generateUniqueId } from '../Utils'

const Form: React.FC<{ addPlayer: (newPlayer: Player) => void }> = ({
    addPlayer,
}) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const scoreRef = useRef<HTMLInputElement>(null)
    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            if (nameRef?.current?.value && scoreRef?.current?.value) {
                const newPlayer: Player = {
                    id: generateUniqueId(),
                    name: nameRef.current.value,
                    score: parseInt(scoreRef.current.value, 10),
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
        <form onSubmit={onSubmit} style={{ marginBottom: '1em' }}>
            <input
                type="text"
                ref={nameRef}
                placeholder="name"
                required
                autoFocus
            />
            <input type="number" ref={scoreRef} placeholder="score" required />
            <button>add</button>
        </form>
    )
}

export default Form
