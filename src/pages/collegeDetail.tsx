import CollegeDetailPage from "../main-pages/CollegePage/CollegeDetailPage";

export async function getServerSideProps(context) {
    return {
        props: context.query, // will be passed to the page component as props
    };
}

const CollegeDetail = (props) => {
    return <CollegeDetailPage data={props} />;
};
export default CollegeDetail;
