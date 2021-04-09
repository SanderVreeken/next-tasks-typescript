import FieldI from '../interfaces/Field'
import FormI from '../interfaces/Form'
import Field from './Field'

interface Props { 
    form: FormI
    handleChange: (...args: any) => void
}

export default function Form({ form, handleChange }: Props) {
    return (
        <form>
            <h3>{form.title}</h3>
            {form.fields.map((field: FieldI) => (
                <>
                    <label>{field.title}</label>
                    <Field field={field} onChange={handleChange} />
                </>
            ))}
        </form>
    )
}