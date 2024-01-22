import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

const LOCALSTORAGE_FILEMAME_KEY = 'eliterating_filename'

const Filename: React.FC<{
    onLoadFilename: (name: string) => void
}> = ({ onLoadFilename }) => {
    const [filename, setFilename] = useState('')

    useEffect(() => {
        const localStorageFilename = localStorage.getItem(
            LOCALSTORAGE_FILEMAME_KEY
        )
        if (localStorageFilename) {
            setFilename(localStorageFilename)
            onLoadFilename(localStorageFilename)
        }
    }, [setFilename, onLoadFilename])

    const onFormSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault()
            e.stopPropagation()
            onLoadFilename(filename)
            localStorage.setItem(LOCALSTORAGE_FILEMAME_KEY, filename)
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
