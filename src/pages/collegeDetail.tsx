import { useRouter } from "next/router";
import React from "react";
import CollegeDetailPage from "../main-pages/CollegePage/CollegeDetailPage";

export async function getServerSideProps(context) {
    return {
        props: context.query, // will be passed to the page component as props
    };
}

const CollegeDetail = (props) => {
      const router = useRouter();
      React.useEffect(() => {
          if (router.isReady) {
              // Code using query
              console.log(router.query);
          }
      }, [router.isReady]);

    return <CollegeDetailPage data={props} />;
};
export default CollegeDetail;
