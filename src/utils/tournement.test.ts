import { describe, expect, it } from 'vitest'
import { mergePlayersByName } from './tournement'

describe('mergePlayersByName', () => {
    it('should merge players with same name ignoring case and spaces', () => {
        const players1 = [
            { name: ' Alice ', score: 10 },
            { name: 'Bob', score: 5 },
        ]
        const players2 = [
            { name: 'alice', score: 8 },
            { name: '  BOB  ', score: 7 },
        ]

        expect(mergePlayersByName(players1, players2)).toEqual([
            { name: 'Alice', score: 18 },
            { name: 'Bob', score: 12 },
        ])
    })

    it('should merge duplicated names inside the same tournament list too', () => {
        const players1 = [
            { name: 'Eve', score: 2 },
            { name: ' eve ', score: 3 },
        ]
        const players2 = [
            { name: 'EVE', score: 4 },
            { name: 'Tom', score: 1 },
            { name: ' tom ', score: 2 },
        ]

        expect(mergePlayersByName(players1, players2)).toEqual([
            { name: 'Eve', score: 9 },
            { name: 'Tom', score: 3 },
        ])
    })

    it('should preserve first encountered trimmed name display', () => {
        const players1 = [{ name: '   jAnE   ', score: 1 }]
        const players2 = [{ name: 'JANE', score: 2 }]

        expect(mergePlayersByName(players1, players2)).toEqual([
            { name: 'jAnE', score: 3 },
        ])
    })
})
