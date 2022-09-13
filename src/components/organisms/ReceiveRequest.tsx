import { Progress, Text } from "@chakra-ui/react";
import ION from "@decentralized-identity/ion-tools";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { INDEX_PAGE_PATH, ISSUE_PAGE_PATH, PRESENT_PAGE_PATH } from "../../configs/routing";
import { proxyHttpRequest } from "../../lib/http";
import { getProtectedHeaderFromVCRequest, getRequestFromVCRequest, getRequestUrlFromMessage } from "../../lib/utils";

export const ReceiveRequest: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { redirectURL } = router.query;
      if (!redirectURL) {
        return;
      }
      const requestUrl = getRequestUrlFromMessage(decodeURI(redirectURL as string));
      const vcRequestInJwt = await proxyHttpRequest<string>("get", requestUrl);

      /**
       * TODO: エラー発生時にエラーページに遷移する
       */
      const header = getProtectedHeaderFromVCRequest(vcRequestInJwt);
      const issDIDDocument = await ION.resolve(header.kid);
      const vcRequestVerified = await ION.verifyJws({
        jws: vcRequestInJwt,
        publicJwk: issDIDDocument.didDocument.verificationMethod[0].publicKeyJwk,
      });
      if (!vcRequestVerified) {
        return {
          redirect: {
            destination: INDEX_PAGE_PATH,
            permanent: false,
          },
        };
      }
      const { vcRequestType, vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

      localStorage.setItem(LOCAL_STORAGE_VC_REQUEST_KEY, JSON.stringify(vcRequest));
      router.push(vcRequestType == "issue" ? ISSUE_PAGE_PATH : PRESENT_PAGE_PATH);
    })();
  }, [router]);
  return (
    <>
      <Text textAlign="center" fontSize="3xl" fontWeight="bold">
        Input Request URL
      </Text>
      <Progress size="xs" isIndeterminate />
    </>
  );
};
