import { useRouter } from "next/router";
import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { CREATE_KEY_PAGE_PATH } from "../configs/routing";
import { isExistKeyPair } from "../lib/repository/keyPair";

const IndexPage: React.FC = () => {
  const router = useRouter();
  React.useEffect(() => {
    if (!isExistKeyPair()) {
      router.push(CREATE_KEY_PAGE_PATH);
    }
  }, [router]);

  return <HomeTemplate />;
};

export default IndexPage;
