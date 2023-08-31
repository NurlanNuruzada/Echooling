import React from "react";
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
} from "@chakra-ui/react";
import image from "../../Images/Animations/checkGreen.mp4";
import { useNavigate } from "react-router";

const Done = ({ buttonsAndNagivage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  React.useEffect(() => {
    onOpen();
  }, []);

  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate(`${buttonsAndNagivage.button1?.navigate}`); // Navigate to the home page
  };

  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <AlertDialogHeader>You Successfully registered</AlertDialogHeader>
            <AlertDialogCloseButton />
            <video width={"200px"} autoPlay>
              <source src={image} type="video/mp4" />
            </video>
            <AlertDialogBody>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <h1
                  color="Black"
                  style={{ fontWeight: "500", fontSize: "18px" }}
                >
                  We sent Confirmation to your email address
                </h1>
                <h1>You can close this by clicking "Done"</h1>
              </Flex>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Flex gap={10}>
                  <Button
                    padding={"0 40px"}
                    width={"100%"}
                    colorScheme={buttonsAndNagivage.button1.color}
                    onClick={handleHomeButtonClick} // Use the custom handler
                    >
                    {buttonsAndNagivage.button1.name}
                  </Button>
                    {buttonsAndNagivage.button2?.name && (
                      <Button
                      padding={"0 40px"}
                      width={"100%"}
                      colorScheme={buttonsAndNagivage.button2?.color}
                      ref={cancelRef}
                      onClick={onClose}
                      >
                  {buttonsAndNagivage.button2?.name}
                </Button>
                  )}
              </Flex>
            </AlertDialogFooter>
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Done;
