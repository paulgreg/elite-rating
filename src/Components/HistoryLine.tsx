import { MouseEvent, useCallback } from 'react'
import { Tournement, Tournements } from '../Types'

const TournementPoint: React.FC<{
    tournement: Tournement
    onSetTournement: (tournementId: string) => void
}> = ({ tournement, onSetTournement }) => {
    const onDivClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            onSetTournement(tournement.id)
        },
        [onSetTournement]
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

const HistoryLine: React.FC<{
    tournements: Tournements
    onSetTournement: (tournementId: string) => void
    onAddTournement: () => void
}> = ({ tournements, onSetTournement, onAddTournement }) => {
    const onPlusClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onAddTournement()
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                marginTop: '1em',
                overflowX: 'auto',
            }}
        >
            {tournements
                .sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((tournement) => (
                    <TournementPoint
                        key={tournement.id}
                        tournement={tournement}
                        onSetTournement={onSetTournement}
                    />
                ))}
            <button onClick={onPlusClick}>➕ new tournement</button>
        </div>
    )
}

export default HistoryLine
