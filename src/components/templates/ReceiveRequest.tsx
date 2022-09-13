import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { ReceiveRequest } from "../organisms/ReceiveRequest";

export const ReceiveRequestTemplate: React.FC = () => {
  return (
    <Body>
      <Container py="0">
        <ReceiveRequest />
      </Container>
    </Body>
  );
};
