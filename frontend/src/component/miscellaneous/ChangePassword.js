import axios from 'axios';
import React, { useState } from 'react';
import { Box, Input, Button, useToast } from '@chakra-ui/react';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const handleChangePassword = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || !userInfo.token || !userInfo._id) {
        throw new Error('User not authenticated');
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/user/${userInfo._id}/change-password`,
        { currentPassword, newPassword },
        config
      );

      toast({
        title: 'Success!',
        description: data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error in handleChangePassword:', error);
      toast({
        title: 'Error Occurred!',
        description:
          error.response?.data?.message ||
          error.message ||
          'Failed to change password',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <Box>
      <Input
        placeholder="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        mb={3}
      />
      <Input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        mb={3}
      />
      <Button colorScheme="blue" onClick={handleChangePassword}>
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
