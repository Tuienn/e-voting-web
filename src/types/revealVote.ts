import type { ElectionStatus } from './election'

export interface ICandidateTally {
    candidateId: string
    candidateName: string | null
    dbRevealCount: number
    chainRevealCount: number
}

export interface ITallyResponse {
    electionId: string
    electionName: string
    status: ElectionStatus
    tallyResult: ICandidateTally[]
    dbRevealTotal: number
    chainRevealTotal: number
    chainError: string | null
}

export interface IAuditResponse {
    electionId: string
    electionName: string
    status: ElectionStatus
    db: { voteCount: number; revealCount: number }
    chain: { voteCount: number; revealCount: number; rootCommitted: boolean } | null
    chainError: string | null
}
