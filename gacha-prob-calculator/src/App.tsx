import React from 'react';
import './App.css';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Title from './container/Title';
import AppInfo from './container/AppInfo';
import CalcProb from './container/CalcProb';

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
      <Row className="mt-3 justify-content-md-center">
        <Col md={6}>
          <Tabs defaultActiveKey="calc" id="main-tab">
            <Tab className="border-bottom border-left border-right p-3" eventKey="calc" title="確率計算">
              <CalcProb />
            </Tab>
            <Tab className="border-bottom border-left border-right p-3" eventKey="test" title="確率推定">
              bbb
            </Tab>
            <Tab className="border-bottom border-left border-right p-3" eventKey="help" title="ヘルプ">
              ccc
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
