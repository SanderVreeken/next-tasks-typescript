import FieldI from '../interfaces/Field'

interface Props {
    field: FieldI
    onChange: (...args: any) => void
}

export default function Field({ field, onChange }: Props) {
    const renderField = () => {
        if (field.element === 'input') {
            return <input onChange={(event) => onChange(field.name, event.target.value)} type={field.type}></input>
        } else {
            return <textarea onChange={(event) => onChange(field.name, event.target.value)}></textarea>
        }
    }

    return (
        renderField()
    )
}