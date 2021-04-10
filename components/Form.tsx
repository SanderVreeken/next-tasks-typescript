import FieldI from '../interfaces/Field'
import Field from './Field'

interface Props { 
    form: FieldI[]
    handleChange: (...args: any) => void
    selected: boolean
    // TODO: Refactor so an actual interface is casted instead.
    // values: TaskI
    values: any
}

export default function Form({ form, handleChange, selected, values }: Props) {
    return (
        <form>
            <h3>{selected ? 'Update Task' : 'Create Task'}</h3>
            {form.map((field: FieldI) => (
                <>
                    <label>{field.title}</label>
                    <Field field={field} onChange={handleChange} value={values[field.name]} />
                </>
            ))}
        </form>
    )
}