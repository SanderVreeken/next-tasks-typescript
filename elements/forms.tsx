import FieldI from '../interfaces/Field'

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