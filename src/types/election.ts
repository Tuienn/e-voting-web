export type ElectionStatus = 'PENDING' | 'ACTIVE' | 'CLOSED' | 'COMPLETED'

export interface ElectionVoter {
    id: string
    electionId: string
    voterId: string
}

export interface Election {
    id: string
    name: string
    status: ElectionStatus
    candidateIds: string[]
    electionVoters?: ElectionVoter[]
    startDate?: string | null
    endDate?: string | null
    createdAt?: string
    updatedAt?: string
}

export interface CreateElectionPayload {
    name: string
    candidateIds: string[]
}
