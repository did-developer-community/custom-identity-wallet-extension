import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { CREDENTIAL_DETAIL_PAGE_PATH } from "../../configs/routing";
import { useStoredVCs } from "../../hooks/useStoredVCs";
import { CredentialCard } from "../molecules/CredentialCard";

export const CredentialList: React.FC = () => {
  const router = useRouter();
  const { storedVCs } = useStoredVCs();
  return (
    <Grid gap={4}>
      {storedVCs.map((storedVC) => {
        return (
          <Box key={storedVC.id}>
            <Box
              cursor={"pointer"}
              _hover={{ opacity: 0.9, transition: "0.2s" }}
              onClick={() => {
                router.push(CREDENTIAL_DETAIL_PAGE_PATH + "?vcID=" + storedVC.id);
              }}
            >
              <CredentialCard storedVC={storedVC} />
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
};
