import FieldI from '../interfaces/Field'
import FormI from '../interfaces/Form'
import Field from './Field'

interface Props { 
    form: FormI
    handleChange: (...args: any) => void
    // TODO: Refactor so an actual interface is casted instead.
    // values: TaskI
    values: any
}

export default function Form({ form, handleChange, values }: Props) {
    return (
        <form>
            <h3>{form.title}</h3>
            {form.fields.map((field: FieldI) => (
                <>
                    <label>{field.title}</label>
                    <Field field={field} onChange={handleChange} value={values[field.name]} />
                </>
            ))}
        </form>
    )
}