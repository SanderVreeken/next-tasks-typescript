import { useState } from 'react'
import { taskButtons } from '../elements/buttons'
import { taskForm } from '../elements/forms'
import { createTask } from '../graphql/fetchers/tasks'
import { CREATE_TASK_MUTATION } from '../graphql/queries/tasks'
import TaskI from '../interfaces/Task'
import styles from '../styles/Modal.module.scss'
import Form from './Form'

interface Props {
    selected?: TaskI
    type: 'task'
}

export default function Modal({ selected, type }: Props) {
    const [task, setTask] = useState<TaskI>(selected ?? {})

    const submitTask = async () => {
        task.dueAt = new Date(task.dueAt!).valueOf()
        try {
            const response = await createTask(CREATE_TASK_MUTATION, { task: task })
            console.log(response)
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (key: string, value: any) => {
        setTask({
            ...task,
            [key]: value
        })
    }

    const renderModal = () => {
        switch(type) {
            case 'task':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <Form form={taskForm} handleChange={handleChange} values={task} />
                        </div>
                        <div role='bottom'>
                            {/* For this component custom buttons are being used. */}
                            {taskButtons.map(button => (
                                <div onClick={() => submitTask()}>
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