import Modal from '../components/Modal'
import Overlay from '../components/Overlay'
import ButtonI from '../interfaces/Button'
import FieldI from '../interfaces/Field'
import FormT from '../types/Form'

const renderModal = (buttons: ButtonI[], form: FieldI[], handleClick: (...args: any) => void, isModal: boolean, state: any, stateFunction: (...args: any) => void, title: string, type: 'form' | 'prompt') => {
    if (isModal) {
        return (
            <>
                <Overlay header={1} />
                <Modal buttons={buttons} form={form} handleClick={handleClick} state={state} stateFunction={stateFunction} title={title} type={type} />
            </>
        )
    }
}

  export default renderModal