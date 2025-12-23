import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import Filename from '../Components/Filename'
import { Link, useNavigate } from 'react-router-dom'
import { PREFIX } from '../constants'
import settings from '../settings.json'
import { formatRawListName } from '../utils/string'

type ItemProps = {
    name: string
    onDeleteList: (rawName: string) => MouseEventHandler<HTMLButtonElement>
}

const Item: React.FC<ItemProps> = ({ name, onDeleteList }) => {
    const formatedName = formatRawListName(name)
    return (
        <li key={name} style={{ margin: '.5em 0' }}>
            <span>
                <Link
                    to={`/${formatedName}`}
                    style={{ display: 'inline-block', minWidth: '12em' }}
                >
                    {formatedName}
                </Link>
                <button
                    onClick={onDeleteList(name)}
                    style={{ margin: '0 .5em' }}
                >
                    🗑️
                </button>
            </span>
        </li>
    )
}

const HomePage = () => {
    const [rawListNames, setRawListNames] = useState<string[]>([])

    const navigate = useNavigate()
    const onLoadFilename = useCallback(
        (filename: string) => {
            navigate(filename)
        },
        [navigate]
    )

    const requestRawListNames = async (): Promise<string[]> => {
        try {
            const url = `${settings.crdtUrl}list?prefix=${PREFIX}&secret=${settings.secret}`
            const response = await fetch(url)
            if (response.ok) return await response.json()
            return []
        } catch (e) {
            console.error(e)
            return []
        }
    }

    const fillListNames = useCallback(async () => {
        if (settings.saveOnline) {
            const lists = await requestRawListNames()
            setRawListNames(lists.toSorted((a, b) => a.localeCompare(b)))
        }
    }, [])

    useEffect(() => {
        setTimeout(fillListNames, 0)
    }, [fillListNames])

    const deleteList = async (docName: string) => {
        const url = `${settings.crdtUrl}del?doc=${encodeURIComponent(
            docName
        )}&secret=${settings.secret}`
        const response = await fetch(url)
        if (response.ok) return await response.json()
        return false
    }

    const onDeleteList = useCallback(
        (rawName: string): MouseEventHandler<HTMLButtonElement> =>
            (e) => {
                e.preventDefault()
                if (confirm(`delete ${formatRawListName(rawName)} ?`)) {
                    deleteList(rawName)
                    fillListNames()
                }
            },
        [fillListNames]
    )

    return (
        <>
            <Filename onLoadFilename={onLoadFilename} />
            <ul style={{ listStyleType: 'none' }}>
                {rawListNames?.map((name) => (
                    <Item key={name} name={name} onDeleteList={onDeleteList} />
                ))}
            </ul>
        </>
    )
}

export default HomePage
