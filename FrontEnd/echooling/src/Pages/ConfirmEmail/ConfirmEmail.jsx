import React, { useEffect } from 'react';
import Styles from './ConfirmEmail.module.css'
import Done from '../../Components/DoneModal/Done';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
const ConfirmEmail = () => {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const QueryParams = new URLSearchParams(location.search)
    const UserId= QueryParams.get("userId")
    const token = QueryParams.get("code")
    useEffect(()=>{
    },[location.search])
    console.log(QueryParams.get("userId"))
    console.log([...searchParams])
    return (
        <div className={Styles.MainContainer}>
            <Done/>
        </div>
    );
}

export default ConfirmEmail;
