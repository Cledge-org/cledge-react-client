import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { NextApplicationPage } from 'src/main-pages/AppPage/AppPage'
import styles from './styles.module.scss'
import TierCard from 'src/main-pages/CollegeList/components/TierCard';
import { collegeListIndivudialInfo } from 'src/@types/types';
const CollegeListPage: NextApplicationPage<{ accountInfo: AccountInfo, collegeList: collegeListIndivudialInfo[] }> = ({ accountInfo, collegeList }) => {
    const [targetSchools, setTargetSchools] = useState<collegeListIndivudialInfo[]>([])
    const [fitSchools, setFitSchools] = useState<collegeListIndivudialInfo[]>([])
    const [reachSchools, setReachSchools] = useState<collegeListIndivudialInfo[]>([])
    useEffect(()=>{
        if(collegeList?.length>0){
            setTargetSchools(collegeList.filter((colleges)=> colleges.fit_type==0))
            setFitSchools(collegeList.filter((colleges)=> colleges.fit_type==1))
            setReachSchools(collegeList.filter((colleges)=> colleges.fit_type==2))
        }
    },[collegeList])
    return (
        <div style={{ marginLeft: "80px",marginRight: "80px"  }}>
            <div>
                <p className={styles.myFavHeader}>My favorites</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <TierCard name='Target Schools' collegeList={targetSchools} />
                <TierCard name='Fit Schools' collegeList={fitSchools} />
                <TierCard name='Reach Schools' collegeList={reachSchools} />
            </div>

        </div>
    )
}

CollegeListPage.requireAuth = true;
export default connect((state) => ({
    accountInfo: state.accountInfo,
}))(CollegeListPage);