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
