import TaskI from "./Task";
import UserI from "./User";

interface LogI {
    date: number
    element: TaskI
    type: string
    updates?: string[]
    user: UserI 
}

export default LogI