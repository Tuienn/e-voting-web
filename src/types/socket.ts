export interface IVoteCommittedEvent {
    electionId: string
    blockchainRef: string
    createdAt: string
}

export interface IVoteRevealedEvent {
    electionId: string
    candidateIds: string[]
    revealKey: string
    blockchainRef: string
    createdAt: string
    electionCompleted: boolean
}
