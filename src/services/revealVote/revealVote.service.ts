import { revealVoteApiService } from '.'
import type { IAuditResponse, ITallyResponse } from '../../types/revealVote'

export default class RevealVoteService {
    private static readonly BASE_URL = '/reveal-vote'

    static getTally = async (id: string) => {
        return await revealVoteApiService<ITallyResponse>(`${RevealVoteService.BASE_URL}/${id}/tally`)
    }

    static getAudit = async (id: string) => {
        return await revealVoteApiService<IAuditResponse>(`${RevealVoteService.BASE_URL}/${id}/audit`)
    }
}
