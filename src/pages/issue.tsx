import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import { IssueTemplate } from "../components/templates/Issue";
import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../configs/constants";
import { LOAD_REQUEST_PAGE_PATH, RESULT_PAGE_PATH } from "../configs/routing";
import { getManifestFromJWT } from "../lib/utils";
import { AcquiredIdToken, Manifest, VCRequest } from "../types";

const IssuePage: React.FC = () => {
  const [vcRequest, setVcRequest] = React.useState<VCRequest>();
  const [manifest, setManifest] = React.useState<Manifest>();
  const [acquiredAttestation, setAcquiredAttestation] = React.useState<AcquiredIdToken>();

  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const vcRequestString = localStorage.getItem(LOCAL_STORAGE_VC_REQUEST_KEY);
      if (!vcRequestString) {
        return {
          redirect: {
            destination: LOAD_REQUEST_PAGE_PATH,
            permanent: false,
          },
        };
      }
      const vcRequest = JSON.parse(vcRequestString);
      const manifestUrl = new URL(
        vcRequest.claims.vp_token.presentation_definition.input_descriptors[0].issuance[0].manifest
      );
      let manifest: Manifest;

      try {
        if (manifestUrl.hostname == "verifiedid.did.msidentity.com") {
          const manifestToken = await axios.get<{ token: string }>(manifestUrl.toString()).then((res) => {
            return res.data.token;
          });
          console.log("manifestToken", manifestToken);
          manifest = getManifestFromJWT(manifestToken);
        } else if (manifestUrl.hostname == "beta.did.msidentity.com") {
          // TODO: This is Beta issuer.
          manifest = await axios.get<Manifest>(manifestUrl.toString()).then((res) => {
            return res.data;
          });
        }
      } catch (e) {
        router.push(RESULT_PAGE_PATH + "?type=issue&result=false&errorMessage=" + e.message);
        console.error(e);
      }

      const acquiredAttestation = {};

      // id_token_hint
      if (vcRequest.id_token_hint) {
        acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
      }

      setVcRequest(vcRequest);
      setManifest(manifest);
      setAcquiredAttestation(acquiredAttestation);
    })();
  }, [router]);
  return <IssueTemplate vcRequest={vcRequest} manifest={manifest} acquiredAttestation={acquiredAttestation} />;
};

export default IssuePage;
