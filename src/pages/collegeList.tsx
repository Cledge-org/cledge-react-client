import { GetServerSidePropsContext } from 'next'
import React from 'react'
import CollegeListPage from 'src/main-pages/CollegeList/CollegeListPage'

function CollegeList() {
  return (
    <CollegeListPage/>
  )
}
export async function getServerSiderProps(ctx:GetServerSidePropsContext){

}
export default CollegeList