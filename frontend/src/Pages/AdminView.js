import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from 'react-router-dom';
const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [editData, setEditData] = useState({ id: null, name: "", email: "", password: "", roomName: "" });
  const toast = useToast();
  const history = useHistory();
  const handleOnClick = () => {
    history.push('/registration');
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    history.push('/');
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = getUserInfo();
      if (!userInfo) return;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get("http://localhost:5000/api/user", config);
        setUsers(data);
      } catch (error) {
        showToast("Error Occurred!", error.response?.data?.message || error.message || "Failed to load users", "error");
      }
    };

    fetchUsers();
  }, [history]);

  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      showToast("Authentication Error", "User not authenticated. Redirecting to login.", "error");
      history.push('/login');
      return null;
    }
    return userInfo;
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handleEditClick = (user) => {
    if (!user || !user._id) return;
    setEditData({
      id: user._id,
      name: user.name,
      email: user.email,
      password: "", // Reset password field
      roomName: user.roomName,
    });
  };

  const handleCancelClick = () => {
    setEditData({ id: null, name: "", email: "", password: "", roomName: "" });
  };

  const handleUpdateClick = async () => {
    const userInfo = getUserInfo();
    if (!userInfo) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (!editData.id) {
        throw new Error("Invalid user ID");
      }

      const { data } = await axios.put(`http://localhost:5000/api/user/${editData.id}`, {
        name: editData.name,
        email: editData.email,
        password: editData.password,
        roomName: editData.roomName,
      }, config);

      setUsers((prevUsers) => prevUsers.map((user) => (user._id === editData.id ? data : user)));
      handleCancelClick();
      showToast("User Updated!", "", "success");
    } catch (error) {
      showToast("Error Occurred!", error.response?.data?.message || error.message || "Failed to update user", "error");
    }
  };

  const handleDeleteClick = async (userId) => {
    const userInfo = getUserInfo();
    if (!userInfo) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (!userId) {
        throw new Error("Invalid user ID");
      }

      await axios.delete(`http://localhost:5000/api/user/${userId}`, config);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      showToast("User Deleted!", "", "success");
    } catch (error) {
      showToast("Error Occurred!", error.response?.data?.message || error.message || "Failed to delete user", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box maxW="100%" overflowX="auto" marginTop={-47} width="100%" height="90vh">
      <Flex justifyContent="space-between" mb={4}>
        <Button onClick={handleOnClick}>Create new Employee</Button>
        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
      </Flex>
      <Box maxH="400px" overflowY="auto" marginTop={-30} width="100%">
        <Table variant="simple" size="sm" mt={6} backgroundColor="white">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Full Name</Th>
              <Th>Email Address</Th>
              <Th>Password</Th>
              <Th>Room Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              user && user._id && (
                <Tr key={user._id}>
                  <Td>{user._id}</Td>
                  <Td>
                    {editData.id === user._id ? (
                      <Input name="name" value={editData.name} onChange={handleInputChange} />
                    ) : (
                      user.name
                    )}
                  </Td>
                  <Td>
                    {editData.id === user._id ? (
                      <Input name="email" value={editData.email} onChange={handleInputChange} />
                    ) : (
                      user.email
                    )}
                  </Td>
                  <Td>
                    {editData.id === user._id ? (
                      <Input name="password" type="password" value={editData.password} onChange={handleInputChange} />
                    ) : (
                      "********"
                    )}
                  </Td>
                  <Td>
                    {editData.id === user._id ? (
                      <Input name="roomName" value={editData.roomName} onChange={handleInputChange} />
                    ) : (
                      user.roomName
                    )}
                  </Td>
                  <Td>
                    {editData.id === user._id ? (
                      <>
                        <Button colorScheme="blue" onClick={handleUpdateClick} mr={2}>
                          Update
                        </Button>
                        <Button colorScheme="red" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button colorScheme="yellow" onClick={() => handleEditClick(user)} mr={2}>
                          Edit
                        </Button>
                        <Button colorScheme="red" onClick={() => handleDeleteClick(user._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </Td>
                </Tr>
              )
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default AdminView;
