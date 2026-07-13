import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'
import { Tournement } from '../Types'
import { useDataContext } from '../DataContext'

const TournementPoint: React.FC<{
    tournement: Tournement
    isSelected: boolean
    isDisabled: boolean
    onSelectChange: (tournementId: string, isSelected: boolean) => void
}> = ({ tournement, isSelected, isDisabled, onSelectChange }) => {
    const { setCurrentTournement } = useDataContext()
    const onDivClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            setCurrentTournement(tournement.id)
        },
        [setCurrentTournement, tournement.id]
    )

    const onCheckboxChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation()
            onSelectChange(tournement.id, e.target.checked)
        },
        [onSelectChange, tournement.id]
    )

    const date = new Date(Date.parse(tournement.date))
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                gap: '.25em',
            }}
        >
            <button onClick={onDivClick}>
                <span>{date.toLocaleDateString('fr-FR')}</span>
                <span>{tournement.name}</span>
            </button>
            <input
                type="checkbox"
                checked={isSelected}
                disabled={isDisabled}
                onChange={onCheckboxChange}
                aria-label={`select ${tournement.name}`}
            />
        </div>
    )
}

const HistoryLine = () => {
    const { tournements, addTournement, mergeTournements } = useDataContext()
    const [selectedTournementIds, setSelectedTournementIds] = useState<string[]>(
        []
    )

    const onPlusClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            addTournement()
        },
        [addTournement]
    )

    const onSelectChange = useCallback(
        (tournementId: string, isSelected: boolean) => {
            setSelectedTournementIds((ids) => {
                if (isSelected) {
                    if (ids.includes(tournementId) || ids.length >= 2) return ids
                    return [...ids, tournementId]
                }
                return ids.filter((id) => id !== tournementId)
            })
        },
        []
    )

    const onMergeClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            if (selectedTournementIds.length !== 2) return
            mergeTournements([
                selectedTournementIds[0],
                selectedTournementIds[1],
            ])
            setSelectedTournementIds([])
        },
        [mergeTournements, selectedTournementIds]
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
                <TournementPoint
                    key={tournement.id}
                    tournement={tournement}
                    isSelected={selectedTournementIds.includes(tournement.id)}
                    isDisabled={
                        selectedTournementIds.length >= 2 &&
                        !selectedTournementIds.includes(tournement.id)
                    }
                    onSelectChange={onSelectChange}
                />
            ))}
            <button onClick={onPlusClick}>➕ new tournement</button>
            <button
                onClick={onMergeClick}
                disabled={selectedTournementIds.length !== 2}
            >
                merge
            </button>
        </div>
    )
}

export default HistoryLine
