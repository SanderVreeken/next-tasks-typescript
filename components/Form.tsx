import FieldT from '../types/Field'
import FormI from '../interfaces/Form'

interface Props { 
    form: FormI
}

export default function Form({ form }: Props) {
    return (
        <form>
            <h3>{form.title}</h3>
            {form.fields.map((field: FieldT) => (
                <>
                    <label>{field.title}</label>
                    {field.input}
                </>
            ))}
        </form>
    )
}