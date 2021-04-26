import { useRouter } from 'next/router'
import { useState } from 'react'
import graphQLClient from '../graphql/client'
import { createTask, deleteTask, updateTask } from '../graphql/fetchers/tasks'
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from '../graphql/queries/tasks'
import FieldI from '../interfaces/Field'
import PromptI from '../interfaces/Prompt'
import TaskI from '../interfaces/Task'
import styles from '../styles/Modal.module.scss'
import FormT from '../types/Form'
import Form from './Form'
import { useStateValue } from './StateProvider'
import ButtonI from '../interfaces/Button'

interface Props {
    buttons: ButtonI[]
    form?: FieldI[]
    handleClick: (...args: any) => void
    prompt?: PromptI
    state: any
    stateFunction: (...args: any) => void
    title: string
    type: 'form' | 'prompt'
}

export default function Modal({ buttons, form, handleClick, prompt, state, stateFunction, title, type }: Props) {
    const handleChange = (key: string, value: any) => {
        stateFunction({
            ...state,
            [key]: value
        })
    }

    const renderButtons = () => {
        const elements: any = []
        buttons.map((button, index) => {
            elements.push(
                // For this component custom buttons are being used.
                <div onClick={() => handleClick(index)} role='button'>
                    <p>{button.title.toUpperCase()}</p>
                </div>
            )
        })
        return elements
    }

    const renderModal = () => {
        switch(type) {
            case 'prompt':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <h3>{prompt?.title}</h3> 
                            <p>{prompt?.message}</p> 
                        </div>
                        <div role='bottom'>
                            
                        </div>
                    </div>
                )
            case 'form':
                return (
                    <div className={styles.modal}>
                        <div role='top'>
                            <Form form={form!} handleChange={handleChange} title={title} type='app' values={state} />
                        </div>
                        <div role='bottom' style={{
                            gridTemplateColumns: `repeat(${buttons.length}, 1fr)`
                        }}>
                            {renderButtons()}
                        </div>
                    </div>
                )
        }
    }

    return renderModal()
}