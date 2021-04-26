import { AiFillRead, AiOutlineBarChart, AiOutlineCalendar, AiTwotoneAppstore } from 'react-icons/ai'

export const createTaskButtons = [{
    title: 'Cancel'
}, {
    title: 'Create Task'
}]

export const headerButtons = [{
    href: '/app/backlog',
    icon: <AiOutlineCalendar />,
    title: 'Backlog'
}, {
    href: '/app/board',
    icon: <AiTwotoneAppstore />,
    title: 'Board'
}, {
    href: '/app/feed',
    icon: <AiFillRead />,
    title: 'Feed'
}, {
    href: '/app/reports',
    icon: <AiOutlineBarChart />,
    title: 'Reports'
}]

export const createProjectButtons = [{
    title: 'Cancel'
}, {
    title: 'Create Project'
}]

export const nonExistentButtons = [{
    title: 'Cancel'
}, {
    title: 'Create Project'
}]

export const unauthorizedButtons = [{
    title: 'Cancel'
}, {
    title: 'Request Access'
}]

export const updateTaskButtons = [{
    title: 'Cancel'
}, {
    title: 'Update Task'
}, {
    title: 'Delete Task'
}]


