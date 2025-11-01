import { MouseEvent, useCallback } from 'react'
import { Tournement } from '../Types'
import { useDataContext } from '../DataContext'

const TournementPoint: React.FC<{
    tournement: Tournement
}> = ({ tournement }) => {
    const { setCurrentTournement } = useDataContext()
    const onDivClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setCurrentTournement(tournement.id)
        },
        [setCurrentTournement, tournement.id]
    )

    const date = new Date(Date.parse(tournement.date))
    return (
        <button
            onClick={onDivClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <span>{date.toLocaleDateString('fr-FR')}</span>
            <span>{tournement.name}</span>
        </button>
    )
}

const HistoryLine = () => {
    const { tournements, addTournement } = useDataContext()

    const onPlusClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            addTournement()
        },
        [addTournement]
    )

    return (
        <div
            style={{
                display: 'flex',
                marginTop: '1em',
                overflowX: 'auto',
            }}
        >
            {tournements.map((tournement) => (
                <TournementPoint key={tournement.id} tournement={tournement} />
            ))}
            <button onClick={onPlusClick}>➕ new tournement</button>
        </div>
    )
}

export default HistoryLine
