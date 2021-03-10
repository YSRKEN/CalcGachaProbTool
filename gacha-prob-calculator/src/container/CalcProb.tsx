import React from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

const CalcProb: React.FC = () => (<Form>
  <Form.Group>
    <Form.Label>ドロップ率（％）</Form.Label>
    <Form.Control placeholder="0以上100以下の実数を入力" />
  </Form.Group>
  <Form.Group>
    <Form.Label>ガチャ回数</Form.Label>
    <Form.Control placeholder="0以上の整数を入力" />
  </Form.Group>
  <Form.Group className="d-none d-sm-block text-center">
    <Button className="mr-3">-10回</Button>
    <Button className="mr-3">-1回</Button>
    <Button className="mr-3" variant="danger">+1回</Button>
    <Button variant="danger">+10回</Button>
  </Form.Group>
  <Form.Group className="d-block d-sm-none text-center">
    <Button className="mr-2">-10回</Button>
    <Button className="mr-2">-1回</Button>
    <Button className="mr-2" variant="danger">+1回</Button>
    <Button variant="danger">+10回</Button>
  </Form.Group>
  <hr />
  <ListGroup className="d-none d-sm-block" variant="flush">
    <ListGroup.Item>1枚以上ドロップする確率：xxx ％</ListGroup.Item>
    <ListGroup.Item>1枚もドロップしない確率：xxx ％</ListGroup.Item>
    <ListGroup.Item>50％以上ドロップするガチャ回数：xxx 回</ListGroup.Item>
    <ListGroup.Item>95％以上ドロップするガチャ回数：xxx 回</ListGroup.Item>
    <ListGroup.Item>99％以上ドロップするガチャ回数：xxx 回</ListGroup.Item>
  </ListGroup>
  <ListGroup className="d-block d-sm-none" variant="flush">
    <ListGroup.Item>1枚以上ドロップ：xxx ％</ListGroup.Item>
    <ListGroup.Item>1枚もドロップしない：xxx ％</ListGroup.Item>
    <ListGroup.Item>50％以上ドロップ：xxx 回</ListGroup.Item>
    <ListGroup.Item>95％以上ドロップ：xxx 回</ListGroup.Item>
    <ListGroup.Item>99％以上ドロップ：xxx 回</ListGroup.Item>
  </ListGroup>
</Form>);

export default CalcProb;