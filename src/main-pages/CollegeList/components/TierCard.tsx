import React from 'react'
import { collegeListIndivudialInfo } from 'src/@types/types'
import CollegeListCard from 'src/main-pages/CollegeList/components/CollegeListCard'
import styles from './componentStyles.module.scss'

import { Droppable } from "react-beautiful-dnd"
interface props {
  name: string
  collegeList: collegeListIndivudialInfo[]
}
const TierCard = ({ name, collegeList }: props) => {
  return (
    <Droppable droppableId={name}>
      {(provided) => {

        return <div className={styles.mainTierContainer} {...provided.droppableProps} ref={provided.innerRef}>
          <p className={styles.tierHeader}>{`${name} (${collegeList.length})`}</p>
          {collegeList.map((college,index) => {
            return <CollegeListCard name={college.college_name} location={college.location} type={college.college_type} college_id={college.college_id} index={index} />
          })}
          {provided.placeholder}
        </div>
      }}
    </Droppable>
  )
}

export default TierCard