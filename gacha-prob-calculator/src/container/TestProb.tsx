import React from "react";
import { Form, ListGroup } from "react-bootstrap";

const TestProb: React.FC = () => {
  return <Form>
    <Form.Group>
      <Form.Label>ガチャ回数</Form.Label>
      <Form.Control placeholder="0以上の整数を入力" />
    </Form.Group>
    <Form.Group>
      <Form.Label>ドロップ回数</Form.Label>
      <Form.Control placeholder="0以上の整数を入力" />
    </Form.Group>
    <Form.Group>
      <Form.Label>公称ドロップ率（％）</Form.Label>
      <Form.Control placeholder="0以上100以下の実数を入力" />
    </Form.Group>
    <hr />
    <ListGroup className="d-none d-sm-block" variant="flush">
      <ListGroup.Item>ドロップする確率：％</ListGroup.Item>
      <ListGroup.Item>ドロップ率の95％信頼区間：％～％</ListGroup.Item>
      <ListGroup.Item>公称ドロップ率のp値：p=</ListGroup.Item>
    </ListGroup>
    <ListGroup className="d-block d-sm-none" variant="flush">
      <ListGroup.Item>ドロップする確率：％</ListGroup.Item>
      <ListGroup.Item>↑の95％信頼区間：％～％</ListGroup.Item>
      <ListGroup.Item>公称確率のp値：p=</ListGroup.Item>
    </ListGroup>
  </Form>;
}

export default TestProb;
