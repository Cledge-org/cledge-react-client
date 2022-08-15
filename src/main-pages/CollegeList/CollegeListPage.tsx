import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { NextApplicationPage } from 'src/main-pages/AppPage/AppPage'
import styles from './styles.module.scss'
import TierCard from 'src/main-pages/CollegeList/components/TierCard';
import { collegeListElementRaw, collegeListIndivudialInfo } from 'src/@types/types';
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from '@mui/material';
import { useSession } from 'next-auth/react';

const CollegeListPage: NextApplicationPage<{ accountInfo: AccountInfo, collegeList: collegeListIndivudialInfo[], setCollegeList }> = ({ accountInfo, collegeList, setCollegeList }) => {
    const [targetSchools, setTargetSchools] = useState<collegeListIndivudialInfo[]>([])
    const [fitSchools, setFitSchools] = useState<collegeListIndivudialInfo[]>([])
    const [reachSchools, setReachSchools] = useState<collegeListIndivudialInfo[]>([])
    const [reloadCounter, setReloadCounter] = useState<number>(0)
    const { data: session } = useSession();
    const handleSubmit = async () => {
        const response = await fetch(`/api/replace-college-list`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ user_id: session.user.uid, college_list: collegeList })
        })
        const responseJson = await response.json()
        alert(responseJson.message)
    }

    const handleRemoveCollege = (college_id:string)=>{
        const temporaryList = collegeList.filter((college)=>college.college_id != college_id)
        setCollegeList(temporaryList)
        setReloadCounter(reloadCounter+1);
        
    }

    const handleOnDragEnd = (result) => {
        console.log(result)
        const temporaryList = collegeList;
        if (result.destination.droppableId == result.source.droppableId) {
            const temporaryElement = temporaryList[result.source.index]
            temporaryList.splice(result.source.index,1)
            temporaryList.splice(result.destination.index,0, temporaryElement)
            setCollegeList(temporaryList)
            setReloadCounter(reloadCounter+1)
            
        }
        if (result.destination.droppableId != result.source.droppableId) {
            if (result.destination.droppableId == "Target Schools") {
                console.log("it should execute now")
                temporaryList.map((college) => {
                    if (college.college_id == result.draggableId) {
                        college.fit_type = 0
                        setCollegeList(temporaryList)
                    }
                })
            }
            if (result.destination.droppableId == "Fit Schools") {
                console.log("it should execute now")
                temporaryList.map((college) => {
                    if (college.college_id == result.draggableId) {
                        college.fit_type = 1
                        setCollegeList(temporaryList)
                    }
                })
            }
            if (result.destination.droppableId == "Reach Schools") {
                console.log("it should execute now")
                temporaryList.map((college) => {
                    if (college.college_id == result.draggableId) {
                        college.fit_type = 2
                        setCollegeList(temporaryList)
                    }
                })
            }
            setReloadCounter(reloadCounter + 1)
        }
    }

    // const getUpdatableListFormat = (list: collegeListIndivudialInfo[]) => {
    //     var college_list: collegeListElementRaw[] = []
    //     list.map((college, index) => {
    //         college_list.push({ college_id: college.college_id, fit_type: college.fit_type, index: index })
    //     })
    //     return college_list
    // }
    useEffect(() => {
        if (collegeList?.length > 0) {
            setTargetSchools(collegeList.filter((colleges) => colleges.fit_type == 0))
            setFitSchools(collegeList.filter((colleges) => colleges.fit_type == 1))
            setReachSchools(collegeList.filter((colleges) => colleges.fit_type == 2))
        }else{
            setTargetSchools([])
            setFitSchools([])
            setReachSchools([])
        }
    }, [collegeList, reloadCounter])
    return (
        <div style={{ marginLeft: "80px", marginRight: "80px" }}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={styles.myFavDiv}>
                <p className={styles.myFavHeader}>My favorites</p>
                <Button variant='contained' style={{textTransform: "none"}} onClick={handleSubmit}>Save Changes</Button>
            </div>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <TierCard name='Target Schools' collegeList={targetSchools} RemoveCollegeFromListFunction={handleRemoveCollege}/>
                    <TierCard name='Fit Schools' collegeList={fitSchools} RemoveCollegeFromListFunction={handleRemoveCollege} />
                    <TierCard name='Reach Schools' collegeList={reachSchools} RemoveCollegeFromListFunction={handleRemoveCollege} />
                </div>

            </DragDropContext>
        </div>
    )
}

CollegeListPage.requireAuth = true;
export default connect((state) => ({
    accountInfo: state.accountInfo,
}))(CollegeListPage);