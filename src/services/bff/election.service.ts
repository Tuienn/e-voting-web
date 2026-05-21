import { queryString } from '../../lib/utils'
import { bffApiService } from '.'
import type { BffResponse, PaginationData, QueryParams } from '../../types/common'
import type { CreateElectionPayload, Election } from '../../types/election'

export default class ElectionService {
    private static readonly BASE_URL = '/coordinator/election'

    static filterElections = async (searchParams: QueryParams) => {
        return await bffApiService<BffResponse<PaginationData<Election>>>(
            `${this.BASE_URL}/filter${queryString(searchParams)}`
        )
    }

    static createElection = async (data: CreateElectionPayload) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/create`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    static addVotersToElection = async (id: string, voterIds: string[]) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/add-voters`, {
            method: 'POST',
            body: JSON.stringify({ voterIds })
        })
    }

    static deleteVotersFromElection = async (id: string, voterIds: string[]) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/delete-voters`, {
            method: 'POST',
            body: JSON.stringify({ voterIds })
        })
    }

    static getElectionsByVoterId = async (voterId: string) => {
        return await bffApiService<BffResponse<Election[]>>(`${this.BASE_URL}/voter/${voterId}/elections`)
    }

    static getElectionsByCandidateId = async (candidateId: string) => {
        return await bffApiService<BffResponse<Election[]>>(`${this.BASE_URL}/candidate/${candidateId}/elections`)
    }

    static startElection = async (id: string) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/start`, {
            method: 'PATCH'
        })
    }

    static closeElection = async (id: string) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/close`, {
            method: 'PATCH'
        })
    }

    static getElectionById = async (id: string) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}`)
    }
}
