import { Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { AppWrapper } from "../components/utils/AppWrapper";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppWrapper>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box width={"375px"} height={"600px"}>
          <Component {...pageProps} />
        </Box>
      </Box>
    </AppWrapper>
  );
};
export default MyApp;
