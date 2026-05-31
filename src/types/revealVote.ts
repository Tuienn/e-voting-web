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
    // Số phiếu đã reveal (mỗi lá phiếu đếm đúng 1 lần)
    dbRevealedBallots: number
    chainRevealedBallots: number
    // Tổng lượt chọn (mỗi lượt chọn ứng viên đếm 1 lần; >= số phiếu khi bầu nhiều ứng viên)
    dbTotalSelections: number
    chainTotalSelections: number
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
