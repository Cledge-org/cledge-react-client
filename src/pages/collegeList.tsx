import { createTheme, ThemeProvider } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { collegeListIndividualInfo } from "src/@types/types";
import CollegeListPage from "src/main-pages/CollegeList/CollegeListPage";

// comment and uncomment to toggle between server and client side rendering
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = getSession(ctx);
  const response = await fetch(
    `http://${ctx.req.headers.host}/api/cst/get-college-list?userId=${
      (
        await session
      ).user.uid
    }`
  );
  const responseJson = (await response.json()) as collegeListIndividualInfo[];
  return {
    props: {
      serverSideData: responseJson["college_list"],
    },
  };
}

function CollegeList({ serverSideData }) {
  const [data, setData] = useState<collegeListIndividualInfo[]>(serverSideData);

  // Uncomment this to enable client side rendering
  // const {data:session} = useSession()
  // useEffect(()=>{
  //   getCollegeListData()
  // },[])

  // const getCollegeListData = async()=>{
  //   const response = await fetch(`/api/cst/get-college-list?userId=${session.user.uid}`)
  //   const responseJson = await response.json()
  //   setData(responseJson["college_list"])
  // }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#506BED",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CollegeListPage
        collegeList={data}
        setCollegeList={(newData) => {
          setData(newData);
        }}
      />
    </ThemeProvider>
  );
}
// export async function getServerSiderProps(ctx:GetServerSidePropsContext){

// }
CollegeList.requireAuth = true;
export default CollegeList;
