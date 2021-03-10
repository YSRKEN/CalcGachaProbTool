import React, { ChangeEvent, useContext } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { CalcProbContext } from '../store/CalcProbStore';

const CalcProb: React.FC = () => {
  const { dropPer, gachaCount, anyDropPer, notDropPer,
    gachaCount50Per, gachaCount95Per, gachaCount99Per, dispatch } = useContext(CalcProbContext);

  const addGachaCount = (diff: number) => {
    dispatch({ type: 'addGachaCount', message: `${diff}` });
  }

  return <Form>
    <Form.Group>
      <Form.Label>ドロップ率（％）</Form.Label>
      <Form.Control placeholder="0以上100以下の実数を入力" value={dropPer} onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'setDropPer', message: e.currentTarget.value });
      }} />
    </Form.Group>
    <Form.Group>
      <Form.Label>ガチャ回数</Form.Label>
      <Form.Control placeholder="0以上の整数を入力" value={gachaCount} onChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'setGachaCount', message: e.currentTarget.value });
      }} />
    </Form.Group>
    <Form.Group className="d-none d-sm-block text-center">
      <Button className="mr-3" onClick={() => {
        addGachaCount(-10);
      }}>-10回</Button>
      <Button className="mr-3" onClick={() => {
        addGachaCount(-1);
      }}>-1回</Button>
      <Button className="mr-3" variant="danger" onClick={() => {
        addGachaCount(1);
      }}>+1回</Button>
      <Button variant="danger" onClick={() => {
        addGachaCount(10);
      }}>+10回</Button>
    </Form.Group>
    <Form.Group className="d-block d-sm-none text-center">
      <Button className="mr-2" onClick={() => {
        addGachaCount(-10);
      }}>-10回</Button>
      <Button className="mr-2" onClick={() => {
        addGachaCount(-1);
      }}>-1回</Button>
      <Button className="mr-2" variant="danger" onClick={() => {
        addGachaCount(1);
      }}>+1回</Button>
      <Button variant="danger" onClick={() => {
        addGachaCount(10);
      }}>+10回</Button>
    </Form.Group>
    <hr />
    <ListGroup className="d-none d-sm-block" variant="flush">
      <ListGroup.Item>1枚以上ドロップする確率：{anyDropPer} ％</ListGroup.Item>
      <ListGroup.Item>1枚もドロップしない確率：{notDropPer} ％</ListGroup.Item>
      <ListGroup.Item>50％以上ドロップするガチャ回数：{gachaCount50Per} 回</ListGroup.Item>
      <ListGroup.Item>95％以上ドロップするガチャ回数：{gachaCount95Per} 回</ListGroup.Item>
      <ListGroup.Item>99％以上ドロップするガチャ回数：{gachaCount99Per} 回</ListGroup.Item>
    </ListGroup>
    <ListGroup className="d-block d-sm-none" variant="flush">
      <ListGroup.Item>1枚以上ドロップ：{anyDropPer} ％</ListGroup.Item>
      <ListGroup.Item>1枚もドロップしない：{notDropPer} ％</ListGroup.Item>
      <ListGroup.Item>50％以上ドロップ：{gachaCount50Per} 回</ListGroup.Item>
      <ListGroup.Item>95％以上ドロップ：{gachaCount95Per} 回</ListGroup.Item>
      <ListGroup.Item>99％以上ドロップ：{gachaCount99Per}  回</ListGroup.Item>
    </ListGroup>
  </Form>;
}

export default CalcProb;
