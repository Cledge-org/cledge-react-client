import React from 'react'
import CollegeListCard from 'src/main-pages/CollegeList/components/CollegeListCard'
import styles from './componentStyles.module.scss'
interface props{
name:string
}
const TierCard= ({name}:props)=> {
  return (
    <div className={styles.mainTierContainer}>
        <p className={styles.tierHeader}>{name}</p>
        <CollegeListCard name='University of Washington - Seattle Campus' location='Seattle, WA' type='Private'/>
        <CollegeListCard name='University of Washington - Seattle Campus' location='Seattle, WA' type='Private'/>
    </div>
  )
}

export default TierCard