import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { collegeListIndivudialInfo } from 'src/@types/types'
import CollegeListPage from 'src/main-pages/CollegeList/CollegeListPage'

function CollegeList() {
  const {data:session} = useSession()
  const [data, setData] = useState<collegeListIndivudialInfo[]>([])
  useEffect(()=>{
    getCollegeListData()
  },[])
  
  const getCollegeListData = async()=>{
    const response = await fetch(`/api/get-college-list?userId=${session.user.uid}`)
    const responseJson = await response.json()
    setData(responseJson["college_list"])
  }
  return (
    <CollegeListPage collegeList={data} setCollegeList={(newData)=>{setData(newData)}}/>
  )
}
// export async function getServerSiderProps(ctx:GetServerSidePropsContext){
  
// }
export default CollegeList