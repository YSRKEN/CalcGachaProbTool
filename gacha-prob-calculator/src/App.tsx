import React from 'react';
import './App.css';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Title from './container/Title';
import AppInfo from './container/AppInfo';
import CalcProb from './container/CalcProb';
import TestProb from './container/TestProb';
import { CalcProbContext, useCalcProbStore } from './store/CalcProbStore';
import { TestProbContext, useTestProbStore } from './store/TestProbStore';

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
          <Tabs defaultActiveKey="help" id="main-tab" transition={false}>
            <Tab className="border-bottom border-left border-right p-3" eventKey="calc" title="確率計算">
              <CalcProbContext.Provider value={useCalcProbStore()}>
                <CalcProb />
              </CalcProbContext.Provider>
            </Tab>
            <Tab className="border-bottom border-left border-right p-3" eventKey="test" title="確率推定">
              <TestProbContext.Provider value={useTestProbStore()}>
                <TestProb />
              </TestProbContext.Provider>
            </Tab>
            <Tab className="border-bottom border-left border-right p-3" eventKey="help" title="ヘルプ">
              <h4>インストール方法</h4>
              <p>スマホのChromeブラウザやSafariブラウザで開き、メニューから<strong>「ホーム画面に追加」</strong>をタップしてください。</p>
              <h4>「確率計算」について</h4>
              <p>ガチャ1連で当たりを引く確率と引く回数から、成功確率などを計算してくれます。</p>
              <h4>「確率推定」について</h4>
              <p>ガチャを引いた回数とドロップ数と予想ドロップ率から、95％信頼区間やp値を計算してくれます。</p>
              <p><strong>95％信頼区間</strong>：その設定のガチャを引いた人のうち、95％は当たりがこの範囲で出る</p>
              <p><strong>p値</strong>：この値が0.05未満なら、予想ドロップ率と実際のドロップ率がかけ離れていると言える</p>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container >
  );
}

export default App;
