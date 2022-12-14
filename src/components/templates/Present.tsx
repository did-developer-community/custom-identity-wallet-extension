import React from "react";

import { VCRequest } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { Present } from "../organisms/Present";

export interface PresentTemplateProps {
  vcRequest: VCRequest;
}

export const PresentTemplate: React.FC<PresentTemplateProps> = ({ vcRequest }) => {
  return (
    <Body>
      <Container py="0">
        <Present vcRequest={vcRequest} />
      </Container>
    </Body>
  );
};
