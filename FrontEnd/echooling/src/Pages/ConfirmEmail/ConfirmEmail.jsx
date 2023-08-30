import React, { useEffect } from 'react';
import Styles from './ConfirmEmail.module.css'
import Done from '../../Components/DoneModal/Done';
import { useLocation } from 'react-router';
const ConfirmEmail = () => {
    const location = useLocation()
    useEffect(()=>{
        const QueryParams = new URLSearchParams(location.search)
        const UserId= QueryParams.get("userId")
        const token = QueryParams.get("code")
        console.log(token +"<=token  userID =>"+ UserId)
    },[location.search])
    return (
        <div className={Styles.MainContainer}>
            <Done/>
        </div>
    );
}

export default ConfirmEmail;
