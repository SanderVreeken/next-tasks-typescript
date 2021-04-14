import Colors from '../enums/colors'
import ButtonI from '../interfaces/Button'
import Button from './Button'

import { headerButtonTheme } from '../themes/button'
import Anchor from './Anchor'
import Dropdown from './Dropdown'
import useSWR from 'swr'
import { readProjects } from '../graphql/fetchers/projects'
import { READ_PROJECTS_QUERY } from '../graphql/queries/projects'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'

interface Props {
    elements?: ButtonI[]
    subheader?: boolean
    token?: string
}

export default function Header({ elements, subheader = false, token }: Props) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    
    const renderHeader = () => {
        if (subheader) { 
            const { data: projects, error } = useSWR(token ? [READ_PROJECTS_QUERY, token] : null, readProjects)

            const filterProjects = () => {
                const path = router.query.alias
                const included = projects?.readProjects.filter((project: any) => {
                    return path === project.alias
                })
                return included.length === 1 ? true : false
            }

            // TODO: Check whether this should be useLayoutEffect instead.
            useEffect(() => {
                if (!token) {
                    router.push('/login')
                }
            })
            
            if (!projects && !error) {
                return null
            } else if(error) {
                // console.log(error)
                return null
            } else if (projects?.readProjects) {
                if (!filterProjects()) {
                    const path = `/app/board/${projects.readProjects[0].alias}`
                    router.push(path)
                }
            }

            return (
                <header style={{
                    backgroundColor: 'transparent',
                    borderBottom: `1px solid ${Colors.mainBorderColor}`,
                    justifyContent: 'space-between',
                }}>
                    {filterProjects() && <Dropdown options={projects.readProjects} />}
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