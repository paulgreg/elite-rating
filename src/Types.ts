import * as Y from 'yjs'

export type Player = {
    id: string
    name: string
    score: number
}

export type Players = Array<Player>

export type Tournement = {
    id: string
    date: string
    name: string
    players: Players
}

export type Tournements = Array<Tournement>

export type YPlayer = string | number

export type YTournement = string | Y.Array<Y.Map<YPlayer>>
