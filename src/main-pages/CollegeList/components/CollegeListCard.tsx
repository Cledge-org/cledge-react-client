
import { IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import styles from './componentStyles.module.scss'
import CrossIcon from '../../../../public/images/CrossIcon.svg'
import Image from 'next/image'
interface Props {
    name: string
    location: string
    type: "Public" | "Private"
}
function CollegeListCard({ name, location, type }: Props) {
    return (
        <div className={styles.cardContainer}>
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
    )
}

export default CollegeListCard