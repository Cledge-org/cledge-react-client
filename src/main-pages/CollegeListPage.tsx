import { connect } from 'react-redux';
import React from 'react'
import { NextApplicationPage } from 'src/main-pages/AppPage/AppPage'

const CollegeListPage: NextApplicationPage<{ accountInfo: AccountInfo }> = ({ accountInfo }) => {
    return (
        <div>
            <h1 style={{fontSize:24}}>My favorites</h1>
        </div>
    )
}

CollegeListPage.requireAuth = true;
export default connect((state) => ({
    accountInfo: state.accountInfo,
}))(CollegeListPage);