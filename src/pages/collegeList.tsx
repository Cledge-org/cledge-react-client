import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import CollegeListPage from 'src/main-pages/CollegeList/CollegeListPage'

function CollegeList() {
  const {data:session} = useSession()
  const [data, setData] = useState()
  useEffect(()=>{
    getCollegeListData()
  },[])
  
  const getCollegeListData = async()=>{
    const response = await fetch(`/api/get-college-list?userId=${session.user.uid}`)
    const responseJson = await response.json()
    setData(responseJson)
  }
  return (
    <CollegeListPage collegeList={data}/>
  )
}
// export async function getServerSiderProps(ctx:GetServerSidePropsContext){
  
// }
export default CollegeList