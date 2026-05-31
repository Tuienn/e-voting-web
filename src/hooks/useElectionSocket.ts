import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { getSocket } from '../lib/socket'
import type { IVoteCommittedEvent, IVoteRevealedEvent } from '../types/socket'

type ElectionSocketEvent = 'committed' | 'revealed'

export const useElectionSocket = (electionId: string, events: ElectionSocketEvent[] = ['committed', 'revealed']) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!electionId) {
            return
        }

        const socket = getSocket()

        const handleVoteCommitted = (event: IVoteCommittedEvent) => {
            if (event.electionId !== electionId) {
                return
            }
            queryClient.invalidateQueries({ queryKey: ['filterVotes', electionId] })
            queryClient.invalidateQueries({ queryKey: ['electionAllInfo', electionId] })
        }

        const handleVoteRevealed = (event: IVoteRevealedEvent) => {
            if (event.electionId !== electionId) {
                return
            }
            queryClient.invalidateQueries({ queryKey: ['tally', electionId] })
            queryClient.invalidateQueries({ queryKey: ['tallyAudit', electionId] })
        }

        socket.emit('election:subscribe', { electionId })

        if (events.includes('committed')) socket.on('vote:committed', handleVoteCommitted)
        if (events.includes('revealed')) socket.on('vote:revealed', handleVoteRevealed)

        return () => {
            socket.emit('election:unsubscribe', { electionId })
            if (events.includes('committed')) socket.off('vote:committed', handleVoteCommitted)
            if (events.includes('revealed')) socket.off('vote:revealed', handleVoteRevealed)
        }
    }, [electionId, events, queryClient])
}
