import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

const Filename: React.FC<{
    onLoadFilename: (name: string) => void
}> = ({ onLoadFilename }) => {
    const [filename, setFilename] = useState('')

    const onFormSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            e.stopPropagation()
            onLoadFilename(filename)
        },
        [filename, onLoadFilename]
    )

    const onFileNameChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setFilename(e.target.value)
        },
        [setFilename]
    )

    return (
        <form onSubmit={onFormSubmit}>
            <fieldset>
                <label>
                    filename :{' '}
                    <input
                        type="text"
                        required
                        placeholder="filename"
                        pattern="[A-Za-z0-9]+"
                        min={1}
                        value={filename}
                        onChange={onFileNameChange}
                    />
                </label>{' '}
                <input type="submit" value="load" />
            </fieldset>
        </form>
    )
}

export default Filename
