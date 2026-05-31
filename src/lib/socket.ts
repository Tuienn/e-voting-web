import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { SOCKET_API_URL } from '../constants/env.config'

let socket: Socket | null = null

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(SOCKET_API_URL, {
            transports: ['websocket'],
            autoConnect: true
        })
    }
    return socket
}
