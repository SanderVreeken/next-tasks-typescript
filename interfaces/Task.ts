interface TaskI {
    _id: string
    createdAt: number
    description?: string
    dueAt: number
    flagged: boolean
    order: number
    title: string
}

export default TaskI
