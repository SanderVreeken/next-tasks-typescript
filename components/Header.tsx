import Colors from '../enums/colors'
import ButtonI from '../interfaces/Button'
import Button from './Button'

import { headerButtonTheme } from '../themes/button'
import Anchor from './Anchor'
import Dropdown from './Dropdown'
import useSWR from 'swr'
import { readProjects } from '../graphql/fetchers/projects'
import { READ_PROJECTS_QUERY } from '../graphql/queries/projects'

interface Props {
    elements?: ButtonI[]
    subheader?: boolean
}

export default function Header({ elements, subheader = false }: Props) {
    const renderHeader = () => {
        if (subheader) {
            const { data: projects } = useSWR([READ_PROJECTS_QUERY], readProjects)
            
            return (
                <header style={{
                    backgroundColor: 'transparent',
                    borderBottom: `1px solid ${Colors.mainBorderColor}`,
                    justifyContent: 'space-between',
                }}>
                    {projects && <Dropdown options={projects.readProjects} />}
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
                        <Anchor href='/'>
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
