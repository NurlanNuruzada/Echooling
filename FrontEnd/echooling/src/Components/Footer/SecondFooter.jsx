import React from 'react'
import Styles from './SecondFooter.module.css'
import { useNavigate } from 'react-router';
import { Button } from '@chakra-ui/react';
export default function SecondFooter({ NavigateTo, ShowButton }) {
    const navigate = useNavigate();
    const handleNavigate = (NavigateTo) => {
        navigate(NavigateTo);
    };
    return (
        <>
            <div className={Styles.main}>
                {ShowButton &&
                    <Button _invalid={true} className={Styles.Button} onClick={() => { handleNavigate(NavigateTo) }}>
                        Continue
                    </Button>
                }
            </div>
        </>
    )
}