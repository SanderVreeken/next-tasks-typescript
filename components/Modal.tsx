import { useRouter } from 'next/router'
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
    type: 'non-existent' | 'task' | 'unauthorized'
}

export default function Modal({ selected, type }: Props) {
    const router = useRouter()
    const [task, setTask] = useState<TaskI>(selected ?? {})
    const [, dispatch] = useStateValue()

    const removeTask = async () => {
        try {
            await deleteTask(DELETE_TASK_MUTATION, { _id: task._id })
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
        dispatch({
            type: 'UPDATE_SELECTED',
            item: undefined
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
                task.project = router.query.alias as string
                response = await createTask(CREATE_TASK_MUTATION, { task: task })
            }
            dismiss()
        } catch(error) {
            console.log(error)
        }
    }

    const renderModal = () => {
        switch(type) {
            case 'non-existent':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <h3>Oops!</h3> 
                            <p>The project you are trying to access does not exist yet, would you create it?</p> 
                        </div>
                        <div role='bottom'>
                            
                        </div>
                    </div>
                )
            case 'task':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <Form form={taskForm} handleChange={handleChange} selected={!!selected} type={type} values={task} />
                        </div>
                        <div role='bottom' style={{
                            gridTemplateColumns: selected ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'
                        }}>
                            {renderButtons()}
                        </div>
                    </div>
                )
            case 'unauthorized':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <h3>Unauthorized!</h3> 
                            <p>You are not a member of this project. Would you like to request access to this project?</p> 
                        </div>
                        <div role='bottom'>
                            
                        </div>
                    </div>
                )
        }
    }

    return renderModal()
}