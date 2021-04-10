import { useState } from 'react'
import { createTaskButton, updateTaskButtons } from '../elements/buttons'
import { taskForm } from '../elements/forms'
import { createTask, deleteTask, updateTask } from '../graphql/fetchers/tasks'
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../graphql/queries/tasks'
import TaskI from '../interfaces/Task'
import styles from '../styles/Modal.module.scss'
import Form from './Form'
import { useStateValue } from './StateProvider'

interface Props {
    selected?: TaskI
    type: 'task'
}

export default function Modal({ selected, type }: Props) {
    const [task, setTask] = useState<TaskI>(selected ?? {})
    const [_, dispatch] = useStateValue()

    const removeTask = async () => {
        try {
            const response = await deleteTask(DELETE_TASK_MUTATION, { _id: task._id })
            dismiss()
        } catch(error) {
            console.log(error)
        }
    }

    const dismiss = () => {
        dispatch({
            type: 'UPDATE_MODAL',
            item: false
        })
    }

    const handleChange = (key: string, value: any) => {
        setTask({
            ...task,
            [key]: value
        })
    }

    const renderButtons = () => {
        const buttons = selected ? updateTaskButtons : createTaskButton
        const elements: any = []

        const functions = [dismiss, submitTask, removeTask]

        buttons.map((button, index) => {
            elements.push(
                // For this component custom buttons are being used.
                <div onClick={() => functions[index]()} role='button'>
                    <p>{button.title.toUpperCase()}</p>
                </div>
            )
        })
        return elements
    }

    const submitTask = async () => {
        task.dueAt = new Date(task.dueAt!).valueOf()
        try {
            let response = {}
            if (selected) {
                response = await updateTask(UPDATE_TASK_MUTATION, { _id: selected._id, task: task })
            } else {
                response = await createTask(CREATE_TASK_MUTATION, { task: task })
            }
            dismiss()
        } catch(error) {
            console.log(error)
        }
        
    }

    const renderModal = () => {
        switch(type) {
            case 'task':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <Form form={taskForm} handleChange={handleChange} selected={!!selected} values={task} />
                        </div>
                        <div role='bottom' style={{
                            gridTemplateColumns: selected ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'
                        }}>
                            {renderButtons()}
                        </div>
                    </div>
                )
        }
    }

    return renderModal()
}