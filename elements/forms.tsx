import FieldI from '../interfaces/Field'

export const loginForm: FieldI[] = [{
    element: 'input',
    name: 'username',
    title: 'Username',
    type: 'text'
}, {
    element: 'input',
    name: 'password',
    title: 'Password',
    type: 'password'
}]

export const registerForm: FieldI[] = [{
    element: 'input',
    name: 'username',
    title: 'Username',
    type: 'text'
}, {
    element: 'input',
    name: 'email',
    title: 'Email',
    type: 'text'
}, {
    element: 'input',
    name: 'password',
    title: 'Password',
    type: 'password'
}]

export const taskForm: FieldI[] = [{
    element: 'input',
    name: 'title',
    title: 'Title',
    type: 'text'
}, {
    element: 'textarea',
    name: 'description',
    title: 'Description'
}, {
    element: 'input',
    name: 'dueAt',
    placeholder: 'yyyy-mm-dd',
    title: 'Due Date',
    type: 'date'
}]