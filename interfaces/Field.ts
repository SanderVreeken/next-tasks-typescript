interface FieldI {
    element: 'input' | 'textarea'
    name: string
    placeholder?: string
    title: string
    type?: 'text' | 'date'
}

export default FieldI