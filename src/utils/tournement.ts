import { Player } from '../Types'

type MergeablePlayer = Pick<Player, 'name' | 'score'>

type MergedPlayer = {
    name: string
    score: number
}

const normalizePlayerName = (name: string) => name.trim().toLocaleLowerCase()

export const mergePlayersByName = (
    players1: MergeablePlayer[],
    players2: MergeablePlayer[]
): MergedPlayer[] => {
    const mergedPlayersByName = new Map<string, MergedPlayer>()

    for (const { name, score } of [...players1, ...players2]) {
        const trimmedName = name.trim()
        const normalizedName = normalizePlayerName(trimmedName)
        const existing = mergedPlayersByName.get(normalizedName)

        if (existing) {
            existing.score += score
            continue
        }

        mergedPlayersByName.set(normalizedName, {
            name: trimmedName,
            score,
        })
    }

    return Array.from(mergedPlayersByName.values())
}
