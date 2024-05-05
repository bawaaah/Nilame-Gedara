import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 Incident Management System</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;