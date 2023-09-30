import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, queryClient, useQueryClient } from 'react-query';
import { AddRole, GetAllUsersWithRoles, RemoveRole, getAllRoles } from '../../../Services/RoleManager';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Select,
    Input,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react';

export default function RoleManager() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allRoles, setAllRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [filter, setFilter] = useState({
        username: '',
        email: '',
        role: '',
    });
    const logsQueryKey = ['logs'];
    const rolesQueryKey = ['Roles'];
    const queryClient = useQueryClient(); 
    const { data, isLoading, isError, error } = useQuery(logsQueryKey,{
        queryFn: GetAllUsersWithRoles,
        staleTime: 0,
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
    };

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const mutateAddRole = useMutation(
        (formData) => AddRole(formData.userId, formData.role),
        {
            onSuccess: () => {
                console.log('Add role mutation succeeded');
                queryClient.invalidateQueries(logsQueryKey);
                queryClient.invalidateQueries(rolesQueryKey);
                handleCloseModal();
            },
        }
    );
    const mutateRemoveRole = useMutation(
        (formData) => RemoveRole(formData.userId, formData.role),
        {
            onSuccess: () => {
                console.log('Remove role mutation succeeded');
                queryClient.invalidateQueries(logsQueryKey);
                queryClient.invalidateQueries(rolesQueryKey);
                handleCloseModal();
            },
        }
    );

    const handleAddRole = () => {
        if (selectedUser && selectedRole) {
            const formData = {
                userId: selectedUser.id,
                role: selectedRole.toString(),
            };
            mutateAddRole.mutate(formData);
        }
    };

    const handleRemoveRole = (userId, role) => {
        const formData = {
            userId,
            role: role.toString(),
        };
        mutateRemoveRole.mutate(formData);
    };

    const { data: Roles } = useQuery(rolesQueryKey,{
        queryFn: getAllRoles,
        staleTime: 0,
    });
    useEffect(() => {
        if (Roles) {
            setAllRoles(Roles.data)
        }
    }, [Roles]);



    return (
        <TableContainer borderRadius={10} m={10} border={'1px solid #CACFD2'}>
            <Flex>
                <Input
                    type="text"
                    name="username"
                    placeholder="Filter by Username"
                    value={filter.username}
                    onChange={handleFilterChange}
                    size="md"
                    w={40}
                />
                <Input
                    type="text"
                    name="email"
                    placeholder="Filter by Email"
                    value={filter.email}
                    onChange={handleFilterChange}
                    size="md"
                    w={40}
                />
                <Select
                    name="role"
                    value={filter.role}
                    onChange={handleFilterChange}
                    size="md"
                    w={40}
                >
                    <option value="">All Roles</option>
                    {allRoles?.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </Select>
            </Flex>

            <Table variant="striped" colorScheme="orange">
                <TableCaption>Users with Roles</TableCaption>
                <Thead>
                    <Tr>
                        <Th p={4} fontSize={14}>
                            №
                        </Th>
                        <Th p={4} fontSize={14}>
                            Username
                        </Th>
                        <Th p={4} fontSize={14}>
                            Email
                        </Th>
                        <Th p={4} fontSize={14}>
                            Roles
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.data &&
                        data.data
                            .filter((user) => {
                                const usernameCondition =
                                    filter.username === '' ||
                                    user.userName.toLowerCase().includes(filter.username.toLowerCase());
                                const emailCondition =
                                    filter.email === '' ||
                                    user.email.toLowerCase().includes(filter.email.toLowerCase());
                                const roleCondition =
                                    filter.role === '' || user.roles.includes(filter.role);

                                return usernameCondition && emailCondition && roleCondition;
                            })
                            .map((user, index) => (
                                <Tr key={user.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{user.userName}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user?.roles?.join(', ')}</Td>
                                    <Td>
                                        <Button onClick={() => handleOpenModal(user)}>Change Roles</Button>
                                    </Td>
                                </Tr>
                            ))}
                </Tbody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>User Roles</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedUser && (
                            <>
                                <Text p={2}>User: {selectedUser.userName}</Text>
                                <ul>
                                    {selectedUser.roles.map((role) => (
                                        <li style={{listStyle:"none"}} key={role}>
                                            <Flex p={2} justifyContent={'space-between'}>
                                                {role}
                                                <Button
                                                    colorScheme="red"
                                                    size="sm"
                                                    onClick={() => handleRemoveRole(selectedUser.id, role)}
                                                >
                                                    Remove
                                                </Button>
                                            </Flex>
                                        </li>
                                    ))}
                                </ul>
                                <Select
                                    name="role"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value)}
                                >
                                    <option value="">Select a Role</option>
                                    {allRoles?.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </Select>
                                <Button onClick={handleAddRole}>Add Role</Button>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </TableContainer>
    );
}
