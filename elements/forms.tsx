import FormI from '../interfaces/Form'

export const taskForm: FormI = {
    title: 'Create Task',
    fields: [{
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
        title: 'Due Date',
        type: 'date'
    }]
}