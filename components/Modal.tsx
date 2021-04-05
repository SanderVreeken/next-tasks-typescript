import { taskButtons } from '../elements/buttons'
import { taskForm } from '../elements/forms'
import styles from '../styles/Modal.module.scss'
import Form from './Form'

interface Props {
    type: 'task'
}

export default function Modal({ type }: Props) {
    const renderModal = () => {
        switch(type) {
            case 'task':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <Form form={taskForm} />
                        </div>
                        <div role='bottom'>
                            {/* For this component custom buttons are being used. */}
                            {taskButtons.map(button => (
                                <div>
                                    <p>{button.title.toUpperCase()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
        }
    }

    return renderModal()
}