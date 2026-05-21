import { queryString } from '../../lib/utils'
import { bffApiService } from '.'
import type { BffResponse, PaginationData, QueryParams } from '../../types/common'
import type { CreateElectionPayload, Election, ElectionAllInfo } from '../../types/election'

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

    static getElectionAllInfo = async (id: string) => {
        return await bffApiService<BffResponse<ElectionAllInfo>>(`${this.BASE_URL}/${id}/all`)
    }

    static addCandidatesToElection = async (id: string, candidateIds: string[]) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/add-candidates`, {
            method: 'POST',
            body: JSON.stringify({ candidateIds })
        })
    }

    static deleteCandidatesFromElection = async (id: string, candidateIds: string[]) => {
        return await bffApiService<BffResponse<Election>>(`${this.BASE_URL}/${id}/delete-candidates`, {
            method: 'DELETE',
            body: JSON.stringify({ candidateIds })
        })
    }
}
