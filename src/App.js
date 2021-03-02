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
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import YakBoard from './YakBoard';
import { BlankBoards } from './Blank';
import ActionBar from './ActionBar';
import { DragDropContext } from 'react-beautiful-dnd';


function App(props) {
  // read data from persistent storage
  let initialData = JSON.parse(localStorage.getItem('boards')) || BlankBoards();
  // states
  let [data, setData] = useState(initialData);
  let [stack, setStack] = useState({
    undo: [],
    redo: []
  });
  let [filterValue, setFilterValue] = useState('');
  console.log(data)
  // effects
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(data));
  }, [data]);
  // handlers
  let execute = (operation, isNewOperation = true) => {
    operation = {...operation};
    if (operation.type === 'add') {
      setData(produce(draft => {
        draft.boardContents[operation.boardUuid].cards.splice(operation.index || Number.MAX_SAFE_INTEGER, 0, operation.cardUuid);
        draft.cardContents[operation.cardUuid] = operation.data;
      }));
    } else if (operation.type === 'save') {
      operation.oldData = data.cardContents[operation.cardUuid];
      setData(produce(draft => {
        draft.cardContents[operation.cardUuid] = operation.data;
      }));
    } else if (operation.type === 'delete') {
      operation.oldData = data.cardContents[operation.cardUuid];
      operation.index = data.boardContents[operation.boardUuid].cards.indexOf(operation.cardUuid);
      setData(produce(draft => {
        draft.boardContents[operation.boardUuid].cards.splice(operation.index, 1);
        delete draft.cardContents[operation.cardUuid];
      }));
    } else if (operation.type === 'move') {
      setData(produce(draft => {
        draft.boardContents[operation.data.droppableId].cards.splice(operation.data.index, 0, operation.cardUuid);
        draft.boardContents[operation.oldData.droppableId].cards.splice(operation.oldData.index, 1);
      }))
    }
    console.log(operation);
    if (isNewOperation) {
      setStack(produce(draft => {
        draft.undo.push(operation);
        draft.redo = [];
      }));
    }
  };
  let reverseOperation = operation => ({
    ...operation,
    type: { 'add': 'delete', 'delete': 'add', 'save': 'save', 'move': 'move' }[operation.type],
    data: operation.oldData,
    oldData: operation.data,
  });

  let handleAddCard = (boardUuid, cardData) => execute({
    type: 'add',
    boardUuid,
    cardUuid: uuidv4(),
    data: cardData,
  });
  let handleSaveCard = (boardUuid, cardUuid, cardData) => execute({
    type: 'save',
    boardUuid,
    cardUuid,
    data: cardData,
  });
  let handleDeleteCard = (boardUuid, cardUuid) => execute({
    type: 'delete',
    boardUuid,
    cardUuid,
  });
  let handleUndo = () => {
    let operation = stack.undo[stack.undo.length - 1];
    execute(reverseOperation(operation), false);
    setStack(produce(draft => {
      draft.redo.push(draft.undo.pop())
    }));
  };
  let handleRedo = () => {
    let operation = stack.redo[stack.redo.length - 1];
    execute(operation, false);
    setStack(produce(draft => {
      draft.undo.push(draft.redo.pop())
    }));
  };
  let handleFilterChange = (filter) => {
    setFilterValue(filter);
  };
  let handleDragEnd = ({destination, source, draggableId}) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }
    execute({
      type: 'move',
      cardUuid: draggableId,
      data: destination,
      oldData: source,
    })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ActionBar
        disableUndo={stack.undo.length <= 0} disableRedo={stack.redo.length <= 0}
        onUndo={handleUndo} onRedo={handleRedo}
        filter={filterValue} onFilterChange={handleFilterChange}
      />
      <Container fluid className='pt-5'>
        <Row>
          {data.boards.map((uuid) => 
            <Col xs={12} md={6} lg={4} xl={3} key={uuid}>
              <YakBoard
                uuid={uuid}
                name={data.boardContents[uuid].name}
                cards={data.boardContents[uuid].cards}
                cardContents={data.cardContents}
                filter={filterValue}
                onAddCard={handleAddCard} onSaveCard={handleSaveCard} onDeleteCard={handleDeleteCard}
              />
            </Col>
          )}
        </Row>
      </Container>
    </DragDropContext>
  );
}

export default App;
