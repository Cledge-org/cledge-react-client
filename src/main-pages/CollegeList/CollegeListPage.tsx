import { connect } from 'react-redux';
import React from 'react'
import { NextApplicationPage } from 'src/main-pages/AppPage/AppPage'
import styles from './styles.module.scss'
import TierCard from 'src/main-pages/CollegeList/components/TierCard';
const CollegeListPage: NextApplicationPage<{ accountInfo: AccountInfo }> = ({ accountInfo }) => {
    return (
        <div style={{marginLeft:"80px"}}>
            <div>
                <p className={styles.myFavHeader}>My favorites</p>
            </div>
            <TierCard name='Target Schools'/>
            
        </div>
    )
}

CollegeListPage.requireAuth = true;
export default connect((state) => ({
    accountInfo: state.accountInfo,
}))(CollegeListPage);