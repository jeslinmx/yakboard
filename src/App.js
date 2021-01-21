// TODO:
// - markdown side effect
// - saving to localStorage
// - move cards
// - undo
// - add lists
// - edit list names
// - rearrange lists
// - dark theme
// - markdown rendering
// - tags rendering
// - checkbox 2-way flow
// - help page

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import YakBoard from './YakBoard';

function App(props) {
  let [data, setData] = useState(props.initialData);

  function handleSaveCard(boardUuid, cardUuid, cardData) {
    setData(prevData => prevData.setIn([boardUuid, 'cards', cardUuid], cardData));
  }
  function handleDeleteCard(boardUuid, cardUuid) {
    setData(prevData => prevData.deleteIn([boardUuid, 'cards', cardUuid]));
  }

  return (
    <Container fluid>
      <Row className="mt-3">
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
