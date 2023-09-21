import React from 'react'
import Styles from './Reviewmessage.module.css'
import Stars from '../Starts/Stars'
import { Flex } from '@chakra-ui/react'
import { useState } from 'react';
export default function ReviewMessage(point) {
    const originalName = 'Nurlan Nuruzade';
    const words = originalName.split(' ');
    const obfuscatedName = words.map((word) => word[0] + '*'.repeat(word.length - 1)).join(' ');
    return (
        <div>
            <Flex pt={5} flexDirection={'column'} >
                <Stars initialRating={3.5}  />
                <Flex className={Styles.nameAndDate} gap={5}>
                    <h1>{obfuscatedName}</h1>
                    <h1>6 nisan 2023</h1>
                </Flex>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sapiente nostrum magnam numquam mollitia nobis, illum doloribus, alias, totam rerum dolorem porro. Deserunt ex sit, explicabo tempore ipsa optio eum.</h1>
            </Flex>
        </div>
    );
};
