import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text
} from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Ensure user is defined before accessing its properties
  if (!user) {
    return null; // or some fallback UI if user is not available
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="450px" position="relative">
          <ModalHeader fontSize="40px" fontFamily="Work sans" d="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center" justifyContent="space-between">
            <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
            <Text fontSize={{ base: '28px', md: '30px' }} fontFamily="Work sans">
              Department Name: {user.roomName}
            </Text>
            <Text fontSize={{ base: '28px', md: '30px' }} fontFamily="Work sans">
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={onClose} position="absolute" bottom="5px">
              Close
            </Button>
          </ModalFooter> 
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
