import FieldI from '../interfaces/Field'
import FormT from '../types/Form'
import Field from './Field'
import styles from '../styles/Form.module.scss'
import Button from './Button'
import { headerButtonTheme } from '../themes/button'
import { useRouter } from 'next/router'
import capitalizeFirstLetter from '../functions/capitalizeFirstLetter'

interface Props { 
    form: FieldI[]
    handleChange: (...args: any) => void
    onClick?: (...args: any) => void
    selected?: boolean
    type: FormT
    // TODO: Refactor so an actual interface is casted instead.
    // values: TaskI
    values: any
}

export default function Form({ form, handleChange, onClick, selected, type, values }: Props) {
    const router = useRouter()

    const renderForm = () => {
        switch(type) {
            case 'auth':
                return (
                    <form className={styles.form}>
                        <h1>{`${renderTitle()} Now`}</h1>
                        {form.map((field: FieldI) => (
                            <>
                                <label>{field.title}</label>
                                <Field field={field} onChange={handleChange} value={values[field.name]} />
                            </>
                        ))}
                        <Button onClick={(event) => onClick!(event)} theme={headerButtonTheme} title={renderTitle()} />  
                    </form>
                )
            case 'project':
                return (
                    // No buttons are included within the form, as they are delivered via the modal.
                    <form className={styles.form}>
                        <h3>New Project</h3>
                        {form.map((field: FieldI) => (
                            <>
                                <label>{field.title}</label>
                                <Field field={field} onChange={handleChange} value={values[field.name]} />
                            </>
                        ))}
                    </form>
                )
            case 'task':
                return (
                    // No buttons are included within the form, as they are delivered via the modal.
                    <form className={styles.form}>
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
    }

    const renderTitle = () => {
        return capitalizeFirstLetter(router.pathname.split('/')[1])
    }

    return renderForm()
}