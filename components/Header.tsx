import Colors from '../enums/colors'
import ButtonI from '../interfaces/Button'
import Button from './Button'

import { headerButtonTheme } from '../themes/button'
import Anchor from './Anchor'
import Dropdown from './Dropdown'
import ProjectI from '../interfaces/Project'

interface Props {
    elements?: ButtonI[]
    projects?: ProjectI[]
    subheader?: boolean
}

export default function Header({ elements, projects, subheader = false }: Props) { 
    console.log(projects)   
    const renderHeader = () => {
        if (subheader) { 
            return (
                <header style={{
                    backgroundColor: 'transparent',
                    borderBottom: `1px solid ${Colors.mainBorderColor}`,
                    justifyContent: 'space-between',
                }}>
                    {projects && <Dropdown options={projects} />}
                </header>
            )
        } else {
            return (
                <header style={{
                    backgroundColor: '#3b83f6',
                    borderBottom: '0',
                    justifyContent: 'center'
                }}>
                    {elements?.map(element => (
                        // TODO: Replace the href with an actual page within the application.
                        <Anchor href={element.href!}>
                            <Button icon={element.icon} title={element.title} theme={headerButtonTheme} />
                        </Anchor>
                    ))}
                </header>
            )
        }
    }

    return (
        renderHeader()
    )
}