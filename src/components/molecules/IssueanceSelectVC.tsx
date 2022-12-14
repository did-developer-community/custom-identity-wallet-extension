import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BadgeCheckIcon, CheckIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";

import { getVCsByType, StoredVC } from "../../lib/repository/vc";
import { Manifest } from "../../types";
import { CredentialCard } from "./CredentialCard";

export interface SelectVCProps {
  manifest: Manifest;
  presentationVCIDs: string[];
  setPresentationVCIDs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectVC: React.FC<SelectVCProps> = ({ manifest, presentationVCIDs, setPresentationVCIDs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVC, setSelectedVC] = React.useState<StoredVC>();

  const SelectiveVC: React.FC<{ requiredVCID: string }> = ({ requiredVCID }) => {
    // typeに当てはまるVCを抽出
    const vcs = getVCsByType(requiredVCID);
    const hundleClick = (vcID: string) => {
      if (presentationVCIDs.includes(vcID)) {
        setPresentationVCIDs(presentationVCIDs.filter((id) => id !== vcID));
        setSelectedVC(undefined);
      } else {
        setPresentationVCIDs([...presentationVCIDs, vcID]);
        setSelectedVC(vcs[vcID]);
      }
    };
    return (
      <>
        <List>
          {Object.keys(vcs).map((vcID, index) => {
            const storedVC = vcs[vcID];
            return (
              <ListItem key={index}>
                <Box
                  onClick={() => {
                    hundleClick(vcID);
                  }}
                >
                  <CredentialCard storedVC={storedVC} />
                  {presentationVCIDs.includes(vcID) && <Icon w="4" h="4" color="green.400" as={CheckIcon} />}
                </Box>
              </ListItem>
            );
          })}
        </List>
      </>
    );
  };

  return (
    <>
      {manifest.input.attestations.presentations != undefined ? (
        manifest.input.attestations.presentations.map((requiredVC, i) => {
          return (
            <div key={i}>
              <Flex
                bg={"blue.50"}
                py="6"
                px="4"
                cursor={"pointer"}
                justifyContent="space-between"
                alignItems="center"
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedVC ? "" : "Select Credential"}
                  </Text>
                  <Text color={"red.500"} fontWeight="bold">
                    [{requiredVC.credentialType}]
                    {selectedVC && <Icon w="4" h="4" color="green.400" as={BadgeCheckIcon} />}
                  </Text>
                </Box>
                {<Icon w="4" h="4" as={ChevronRightIcon} />}
              </Flex>
              <Drawer size={"full"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">Select Credential</DrawerHeader>
                  <DrawerBody>
                    <SelectiveVC requiredVCID={requiredVC.id} />
                    <Button onClick={onClose}>Save</Button>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
