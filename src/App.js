// TODO:
// - move cards
// - add lists
// - edit list names
// - rearrange lists
// - keyboard shortcuts
// - markdown rendering
// - tags rendering
// - checkbox 2-way flow
// - help page
// - dark theme
// - what other ui toolkits?

import 'bootstrap/dist/css/bootstrap.min.css';
import { fromJS, Stack } from 'immutable';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import YakBoard from './YakBoard';
import { BlankBoards } from './Blank';
import ActionBar from './ActionBar';


function App(props) {
  // read data from persistent storage
  let initialData = fromJS(
    (
      JSON.parse(localStorage.getItem('boards'))
      || BlankBoards()
    ),
    (key, value) => (!key || key === 'cards') ? value.toOrderedMap() : value.toMap()
  );
  // states
  let [data, setData] = useState(initialData);
  let [undoStack, setUndoStack] = useState(Stack());
  let [redoStack, setRedoStack] = useState(Stack());
  let [filterValue, setFilterValue] = useState('');
  // effects
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(data.toJS()));
  }, [data]);
  // handlers
  let execute = (operation, isNewOperation = true) => {
    if (operation.type === 'add') {
      setData(prevData => prevData.setIn(operation.location, operation.data));
    } else if (operation.type === 'save') {
      operation.oldData = data.getIn(operation.location);
      setData(prevData => prevData.setIn(operation.location, operation.data));
    } else if (operation.type === 'delete') {
      operation.oldData = data.getIn(operation.location);
      setData(prevData => prevData.deleteIn(operation.location));
    }
    console.log(operation);
    if (isNewOperation) {
      setUndoStack(prevStack => prevStack.push(operation));
      setRedoStack(redoStack.clear());
    }
  };
  let reverseOperation = operation => ({
    type: { 'add': 'delete', 'delete': 'save', 'save': 'save' }[operation.type],
    location: operation.location,
    data: operation.oldData,
    oldData: operation.data,
  });

  let handleAddCard = (boardUuid, cardData) => execute({
    type: 'add',
    location: [boardUuid, 'cards', uuidv4()],
    data: cardData,
  });
  let handleSaveCard = (boardUuid, cardUuid, cardData) => execute({
    type: 'save',
    location: [boardUuid, 'cards', cardUuid],
    data: cardData,
  });
  let handleDeleteCard = (boardUuid, cardUuid) => execute({
    type: 'delete',
    location: [boardUuid, 'cards', cardUuid],
  });
  let handleUndo = () => {
    let operation = undoStack.peek();
    execute(reverseOperation(operation), false);
    setUndoStack(prevStack => prevStack.pop());
    setRedoStack(prevStack => prevStack.push(operation));
  };
  let handleRedo = () => {
    let operation = redoStack.peek();
    execute(operation, false);
    setUndoStack(prevStack => prevStack.push(operation));
    setRedoStack(prevStack => prevStack.pop());
  };
  let handleFilterChange = (filter) => {
    setFilterValue(filter);
  };

  return (
    <>
      <ActionBar
        disableUndo={undoStack.size <= 0} disableRedo={redoStack.size <= 0}
        onUndo={handleUndo} onRedo={handleRedo}
        filter={filterValue} onFilterChange={handleFilterChange}
      />
      <Container fluid className='pt-5'>
        <Row>
          {data.map((board, uuid) => 
            <Col xs={12} md={6} lg={4} xl={3} key={uuid}>
              <YakBoard
                uuid={uuid} name={board.get('name')} cards={board.get('cards')}
                filter={filterValue}
                onAddCard={handleAddCard} onSaveCard={handleSaveCard} onDeleteCard={handleDeleteCard}
              />
            </Col>
          ).toList()}
        </Row>
      </Container>
    </>
  );
}

export default App;
