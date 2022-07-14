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


      router.query.data && localStorage.setItem("query", router.query.data.toString());
      const a = router.query.data || localStorage.getItem("query");

      React.useEffect(() => {
          if (router.isReady) {
              // Code using query
              console.log(a);
          }
      }, [router.isReady]);

    return <CollegeDetailPage data={props} />;
};
export default CollegeDetail;
