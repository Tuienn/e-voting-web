import type React from 'react'

interface Props {
    children?: React.ReactNode
    index: number
    value: number
}

const TabPanel: React.FC<Props> = (props) => {
    return (
        <div
            role='tabpanel'
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
            {...props}
        >
            {props.value === props.index && props.children}
        </div>
    )
}

export const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    }
}

export default TabPanel
