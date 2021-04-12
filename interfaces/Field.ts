interface FieldI {
    element: 'input' | 'textarea'
    name: string
    placeholder?: string
    title: string
    type?: 'date' | 'password' | 'text' 
}

export default FieldI