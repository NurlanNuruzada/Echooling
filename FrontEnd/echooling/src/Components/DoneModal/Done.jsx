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
const Done = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  React.useEffect(() => {
    onOpen();
  }, []);

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
              <Button
              padding={"0 40px"}
                width={"100%"}
                colorScheme="green"
                ref={cancelRef}
                onClick={onClose}
              >
                Done
              </Button>
            </AlertDialogFooter>
          </Flex>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Done;
