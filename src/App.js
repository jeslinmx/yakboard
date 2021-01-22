// TODO:
// - markdown side effect
// - move cards
// - undo
// - add lists
// - edit list names
// - rearrange lists
// - dark theme
// - shameless self-promotion
// - markdown rendering
// - tags rendering
// - checkbox 2-way flow
// - help page

import 'bootstrap/dist/css/bootstrap.min.css';
import { fromJS } from 'immutable';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import YakBoard from './YakBoard';
import { BlankBoards } from './Blank';

function App(props) {
  let [data, setData] = useState(fromJS(
    (
      JSON.parse(localStorage.getItem('boards'))
      || BlankBoards()
    ),
    (key, value) => (!key || key === 'cards') ? value.toOrderedMap() : value.toMap()
  ));

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(data.toJS()));
  }, [data]);

  function handleSaveCard(boardUuid, cardUuid, cardData) {
    setData(prevData => prevData.setIn([boardUuid, 'cards', cardUuid], cardData));
  }
  function handleDeleteCard(boardUuid, cardUuid) {
    setData(prevData => prevData.deleteIn([boardUuid, 'cards', cardUuid]));
  }

  return (
    <Container fluid>
      <Row>
        {data.map((board, uuid) => 
          <Col xs={12} md={6} lg={4} xl={3} key={uuid}>
            <YakBoard
              uuid={uuid}
              name={board.get('name')}
              cards={board.get('cards')}
              onSaveCard={handleSaveCard}
              onDeleteCard={handleDeleteCard}
            />
          </Col>
        ).toList()}
      </Row>
    </Container>
  );
}

export default App;
