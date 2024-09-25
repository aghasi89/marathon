export interface ISelectedUser {
    name: string
    image?: string
    id: string
    role?: string
}
export interface IChatMember {
    channel_role?: string
    created_at?: string
    role?: string
    user?: ISelectedUser
    user_id: string
}
