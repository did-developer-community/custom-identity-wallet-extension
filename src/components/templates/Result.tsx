import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Result } from "../organisms/Result";

export interface ResultTemplateProps {
  type: "issue" | "present" | "scanner";
  result: boolean;
  errorMessage: string | undefined;
}

export const ResultTemplate: React.FC<ResultTemplateProps> = ({ type, result, errorMessage }) => {
  return (
    <Body>
      <Container py="8">
        <Result type={type} result={result} errorMessage={errorMessage} />
      </Container>
    </Body>
  );
};
