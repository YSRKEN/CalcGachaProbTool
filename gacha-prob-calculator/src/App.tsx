import React from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Title from './container/Title';
import AppInfo from './container/AppInfo';

const App: React.FC = () => {
  return (
    <Container>
      <Row className="my-3">
        <Col className="text-center">
          <Title />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <AppInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
