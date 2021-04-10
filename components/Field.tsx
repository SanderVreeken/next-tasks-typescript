import FieldI from '../interfaces/Field'

interface Props {
    field: FieldI
    onChange: (...args: any) => void
    value: string | number
}

export default function Field({ field, onChange, value }: Props) {
    const renderField = () => {
        if (field.element === 'input') {
            return <input onChange={(event) => onChange(field.name, event.target.value)} type={field.type} value={value}></input>
        } else {
            return <textarea onChange={(event) => onChange(field.name, event.target.value)} value={value}></textarea>
        }
    }

    return (
        renderField()
    )
}