import React from 'react'
import { useMutation, useQueries } from 'react-query';
import { DeleteEvents, getallEvents } from '../../../Services/EventService';
import {
    Table,
    Thead,
    Flex,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
} from '@chakra-ui/react';
import Styles from './ListOfEvents.module'
export default function ListOfEvents() {
    const { data, isLoading, isError, error } = useQueries({
        queryKey: ["Events"],
        queryFn: getallEvents,
        staleTime: 0,

    });
    const queryClient = useQueries()
    const { mutate : Delete } = useMutation(
        (formData) => DeleteEvents(formData),
        {
            onSuccess: (resp) => {
                queryClient.invalidateQueries("Events");
            },
            onError: (error) => {
                console.error(error);
            },
        }
    );

    return (
        <div>

            <div>ListOfEvents</div>
            <Flex>
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error: {error.message}</div>}
                <TableContainer className={Styles.TableContainer} p={10} w={"100%"}>
                    <Table size='lg' >
                        <TableCaption>Get all Sliders </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>image</Th>
                                <Th>Title</Th>
                                <Th>Second Title</Th>
                                <Th>Description</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.data.map((slider) => (
                                <Tr key={slider.id}>
                                    <Td><img src={`/Uploads/${slider.imageRoutue}`} alt="" /></Td>
                                    <Td>{slider.title}</Td>
                                    <Td>{slider.seccondTile}</Td>
                                    <Td>{slider.description}</Td>
                                    <Td><Button color={'white '} borderColor={'white'} backgroundColor={'orange '}>Update</Button></Td>
                                    <Td><Button onClick={() => Delete(slider.guId)} color={'white '} borderColor={'white'} backgroundColor={"red"}>Delete</Button></Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </div>
    )
}
