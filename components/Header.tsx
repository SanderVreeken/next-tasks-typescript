import Colors from '../enums/colors'
import ButtonI from '../interfaces/Button'
import Button from './Button'

import { regularButton } from '../themes/button'
import Anchor from './Anchor'

interface Props {
    elements?: ButtonI[]
    subheader?: boolean
}

export default function Header({ elements, subheader = false }: Props) {
    const renderHeader = () => {
        return (
            subheader ? (
                <header style={{
                    backgroundColor: 'transparent',
                    borderBottom: `1px solid ${Colors.mainBorderColor}`,
                    justifyContent: 'space-between',
                    padding: '0 1.5rem'
                }}>
                    <h4>Product Design Team</h4>
                </header>
            ) : (   
                <header style={{
                    backgroundColor: 'blue',
                    borderBottom: '0',
                    justifyContent: 'center'
                }}>
                    {elements?.map(element => (
                        // TODO: Replace the href with an actual page within the application.
                        <Anchor href='/'>
                            <Button icon={element.icon} title={element.title} theme={regularButton} />
                        </Anchor>
                    ))}
                </header>
            )
        )
    }

    return (
        renderHeader()
    )
}