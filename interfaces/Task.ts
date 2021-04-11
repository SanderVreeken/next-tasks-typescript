interface TaskI {
    _id?: string
    createdAt?: number
    description?: string
    dueAt?: number
    flagged?: boolean
    order?: number
    project?: string
    title?: string
}

export default TaskI
