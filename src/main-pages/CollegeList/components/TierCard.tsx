import React from 'react'
import { collegeListIndivudialInfo } from 'src/@types/types'
import CollegeListCard from 'src/main-pages/CollegeList/components/CollegeListCard'
import styles from './componentStyles.module.scss'
interface props{
name:string
collegeList : collegeListIndivudialInfo[]
}
const TierCard= ({name, collegeList}:props)=> {
  return (
    <div className={styles.mainTierContainer}>
        <p className={styles.tierHeader}>{name}</p>
        {collegeList.map((college)=>{
          return  <CollegeListCard name={college.college_name} location={college.location} type={college.college_type}/>
        })}
    </div>
  )
}

export default TierCard