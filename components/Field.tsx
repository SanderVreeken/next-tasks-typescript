import moment from 'moment'
import FieldI from '../interfaces/Field'

interface Props {
    field: FieldI
    onChange: (...args: any) => void
    value: string | number
}

export default function Field({ field, onChange, value }: Props) {
    const renderField = () => {
        if (field.element === 'input') {
            return <input onChange={(event) => onChange(field.name, event.target.value)} type={field.type} value={renderValueFormat()}></input>
        } else {
            return <textarea onChange={(event) => onChange(field.name, event.target.value)} value={value}></textarea>
        }
    }

    const renderValueFormat = () => {
        if (typeof value === 'number') {
            return moment(value).format('YYYY-MM-DD')
        } else {
            return value
        }
    }

    return (
        renderField()
    )
}