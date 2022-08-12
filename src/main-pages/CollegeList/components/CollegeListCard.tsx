
import { IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import styles from './componentStyles.module.scss'
import CrossIcon from '../../../../public/images/CrossIcon.svg'
import Image from 'next/image'
import { Draggable } from "react-beautiful-dnd"
interface Props {
    name: string
    location: string
    type: "Public" | "Private"
    college_id: string;
    index: number
    RemoveCollegeFromListFunction: Function

}
function CollegeListCard({ name, location, type, college_id, index, RemoveCollegeFromListFunction }: Props) {

    const handleRemove = () => {

    }
    return (
        <Draggable key={college_id} draggableId={college_id} index={index}>
            {(provided) => {

                return <div className={styles.cardContainer} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className={styles.titleContainer}>
                        <p className={styles.collegeName}>{name}</p>
                        <Image src={CrossIcon} onClick={() => { RemoveCollegeFromListFunction(college_id) }} />
                    </div>

                    <div>
                        <div>
                            <span>{location}</span>
                        </div>
                        <div>
                            <span>{type}</span>
                        </div>
                        <a href='/dashboard'><u color='#0B1142'>See details</u></a>
                    </div>
                </div>
            }}
        </Draggable>
    )
}

export default CollegeListCard