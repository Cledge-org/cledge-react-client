import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { NextApplicationPage } from 'src/main-pages/AppPage/AppPage'
import styles from './styles.module.scss'
import TierCard from 'src/main-pages/CollegeList/components/TierCard';
import { collegeListIndivudialInfo } from 'src/@types/types';
import { DragDropContext } from "react-beautiful-dnd";
const CollegeListPage: NextApplicationPage<{ accountInfo: AccountInfo, collegeList: collegeListIndivudialInfo[], setCollegeList }> = ({ accountInfo, collegeList, setCollegeList }) => {
    const [targetSchools, setTargetSchools] = useState<collegeListIndivudialInfo[]>([])
    const [fitSchools, setFitSchools] = useState<collegeListIndivudialInfo[]>([])
    const [reachSchools, setReachSchools] = useState<collegeListIndivudialInfo[]>([])
    const [reloadCounter, setReloadCounter] = useState<number>(0)
    const handleOnDragEnd = (result) => {
        console.log(result)
        if(result.destination.droppableId!=result.source.droppableId){
            if(result.destination.droppableId == "Target Schools"){
                console.log("it should execute now")
                const temporaryList = collegeList
                temporaryList.map((college)=>{
                    if(college.college_id==result.draggableId){
                        college.fit_type= 0
                        setCollegeList(temporaryList)
                        console.log(temporaryList)
                        console.log(collegeList)
                    }
                })
            }
            if(result.destination.droppableId == "Fit Schools"){
                console.log("it should execute now")
                const temporaryList = collegeList
                temporaryList.map((college)=>{
                    if(college.college_id==result.draggableId){
                        college.fit_type= 1
                        setCollegeList(temporaryList)
                        console.log(temporaryList)
                        console.log(collegeList)
                    }
                })
            }
            if(result.destination.droppableId == "Reach Schools"){
                console.log("it should execute now")
                const temporaryList = collegeList
                temporaryList.map((college)=>{
                    if(college.college_id==result.draggableId){
                        college.fit_type= 2
                        setCollegeList(temporaryList)
                        console.log(temporaryList)
                        console.log(collegeList)
                    }
                })
            }
            setReloadCounter(reloadCounter+1)
        }
    }
    useEffect(() => {
        if (collegeList?.length > 0) {
            setTargetSchools(collegeList.filter((colleges) => colleges.fit_type == 0))
            setFitSchools(collegeList.filter((colleges) => colleges.fit_type == 1))
            setReachSchools(collegeList.filter((colleges) => colleges.fit_type == 2))
        }
    }, [collegeList,reloadCounter])
    return (
        <div style={{ marginLeft: "80px", marginRight: "80px" }}>
            <div>
                <p className={styles.myFavHeader}>My favorites</p>
            </div>

            <DragDropContext onDragEnd= {handleOnDragEnd}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <TierCard name='Target Schools' collegeList={targetSchools} />
                    <TierCard name='Fit Schools' collegeList={fitSchools} />
                    <TierCard name='Reach Schools' collegeList={reachSchools} />
                </div>
            </DragDropContext>

        </div>
    )
}

CollegeListPage.requireAuth = true;
export default connect((state) => ({
    accountInfo: state.accountInfo,
}))(CollegeListPage);