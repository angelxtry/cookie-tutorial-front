import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

interface FullSizeLayoutProps {
  children: React.ReactNode;
}

export function FullSizeLayout({ children }: FullSizeLayoutProps): JSX.Element {
  return (
    <Container fluid>
      <Row className="justify-content-md-center vh-100">
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
