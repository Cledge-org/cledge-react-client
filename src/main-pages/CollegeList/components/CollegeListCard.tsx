
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
}
function CollegeListCard({ name, location, type, college_id, index }: Props) {
    return (
        <Draggable key={college_id} draggableId={college_id} index={index}>
            {(provided) => {

                return <div className={styles.cardContainer} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div>
                        <p className={styles.collegeName}>{name}</p>
                        {/* <Image src={CrossIcon}/> */}
                    </div>
                    <div>
                        <div>
                            <span>{location}</span>
                        </div>
                        <div>
                            <span>{type}</span>
                        </div>
                        <Link href={'/dashboard'} color='#0B1142' className='seeDetailsLink'>See details</Link>
                    </div>
                </div>
            }}
        </Draggable>
    )
}

export default CollegeListCard