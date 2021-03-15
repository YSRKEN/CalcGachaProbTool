import React, { ChangeEvent, useContext } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { TestProbContext } from '../store/TestProbStore';

const TestProb: React.FC = () => {
  const { gachaCount, dropCount, officialDropPer, dropPer, dispatch } = useContext(TestProbContext);

  return <Form>
    <Form.Group>
      <Form.Label>ガチャ回数</Form.Label>
      <Form.Control placeholder="0以上の整数を入力" value={gachaCount} onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'setGachaCount', message: e.currentTarget.value });
      }} />
    </Form.Group>
    <Form.Group>
      <Form.Label>ドロップ回数</Form.Label>
      <Form.Control placeholder="0以上の整数を入力" value={dropCount} onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'setDropCount', message: e.currentTarget.value });
      }} />
    </Form.Group>
    <Form.Group>
      <Form.Label>公称ドロップ率（％）</Form.Label>
      <Form.Control placeholder="0以上100以下の実数を入力" value={officialDropPer} onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'setOfficialDropPer', message: e.currentTarget.value });
      }} />
    </Form.Group>
    <hr />
    <ListGroup className="d-none d-sm-block" variant="flush">
      <ListGroup.Item>ドロップする確率：{dropPer} ％</ListGroup.Item>
      <ListGroup.Item>ドロップ率の95％信頼区間：％～％</ListGroup.Item>
      <ListGroup.Item>公称ドロップ率のp値：p=</ListGroup.Item>
    </ListGroup>
    <ListGroup className="d-block d-sm-none" variant="flush">
      <ListGroup.Item>ドロップする確率：{dropPer} ％</ListGroup.Item>
      <ListGroup.Item>↑の95％信頼区間：％～％</ListGroup.Item>
      <ListGroup.Item>公称確率のp値：p=</ListGroup.Item>
    </ListGroup>
  </Form>;
}

export default TestProb;
