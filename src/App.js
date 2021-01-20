// TODO:
// - delete cards
// - markdown side effect
// - saving to localStorage
// - add lists
// - edit list names
// - move cards
// - rearrange lists
// - dark theme
// - markdown rendering
// - tags rendering
// - checkbox 2-way flow
// - help page

import 'bootstrap/dist/css/bootstrap.min.css';
import { createRef, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Check, PencilFill, X } from 'react-bootstrap-icons';
import Immutable from 'immutable';
import {v4 as uuidv4} from 'uuid';

let noop = () => {};

function YakCard({
  uuid,
  title,
  content, // content of card, will be rendered into markdown
  isNew = false, // if true, the card is created in edit mode, with focus on the title field
  onSave = noop, // (cardUuid, cardData) - called when the card loses focus in editing mode, or the save button is clicked
  onCancel = noop, // (cardUuid) - called when the cancel button is clicked, or a new blank card is saved
}) {

  let [editing, setEditing] = useState(Boolean(isNew));
  let titleInput = createRef(); // handle editing of title and content using uncontrolled components
  let contentInput = createRef(); // this gives us the ability to cancel just by...cancelling

  function handleEdit() {
    setEditing(true);
  }
  function handleCancel() {
    onCancel(uuid);
    setEditing(false);
  }
  function handleSave() {
    if (isNew && !titleInput.current.value && !contentInput.current.value) {
      // if a new card is being saved, with blank title and content, treat as a cancel
      onCancel(uuid);
    }
    else {
      onSave(uuid, Immutable.Map({
        title: titleInput.current.value,
        content: contentInput.current.value,
      }));
    }
    setEditing(false);
  }
  function handleBlur(e) {
    // trigger a save only if currently editing and the newly focused element is outside of the card
    if (editing && !e.currentTarget.contains(e.relatedTarget)) {
      handleSave();
    }
  }

  return (
    <Card className="mb-3" onBlur={handleBlur}>
      <Card.Header>
        <InputGroup>
          {editing ?
            <Form.Control
              type="text"
              key="editing" autoFocus={isNew} placeholder="Title" defaultValue={title}
              ref={titleInput}
            />
            : <Form.Control
              type="text"
              key="static" plaintext readOnly value={title}
            />
          }
          <InputGroup.Append>
            {editing ?
              <>
                <Button variant="outline-danger" key="cancel" onClick={handleCancel}><X /></Button>
                <Button variant="success" key="save" onClick={handleSave}><Check /></Button>
              </>
              : <Button variant="light" key="edit" onClick={handleEdit}><PencilFill /></Button>
            }
          </InputGroup.Append>
        </InputGroup>
      </Card.Header>
      {/* hide card body if there is no content and we are not editing */}
      {(content || editing) ?
        <Card.Body>
          {editing ?
            <Form.Control
              as="textarea" rows={4}
              placeholder="Details" defaultValue={content}
              autoFocus={!isNew}
              ref={contentInput}
            />
            : <>
              <Card.Text>{content}</Card.Text>
              {/* <Card.Text>
                {props.tags.map(tag =>
                  <Badge variant="secondary" key="tag">{tag}</Badge>
                )}
              </Card.Text> */}
            </>
          }
        </Card.Body>
        : null
      }
    </Card>
  );
}

function YakBoard({
  uuid,
  name,
  cards,
  onSaveCard = noop, // (boardUuid, cardUuid, cardData) - called when a card on this board triggers its onSave event
}) {

  let [newCard, setNewCard] = useState(false);

  function handleAddCard() {
    setNewCard(uuidv4());
  }
  function handleSaveCard(cardUuid, cardData) {
    onSaveCard(uuid, cardUuid, cardData);
    setNewCard(false);
  }
  function handleCancelNewCard() {
    setNewCard(false);
  }

  return (
    <Card bg="light">
      <Card.Header>
        <Card.Title className="text-center">{name}</Card.Title>
      </Card.Header>
      <Card.Body>
        {cards.map((card, uuid) => 
          <YakCard
            key={uuid}
            uuid={uuid} title={card.get('title')} content={card.get('content')}
            onSave={handleSaveCard}
          />
        ).toList()}
        {newCard ?
        <YakCard
          isNew key={newCard}
          uuid={newCard}
          onSave={handleSaveCard} onCancel={handleCancelNewCard}
        />
        : <Button block variant="outline-secondary" size="lg" onClick={handleAddCard}>+</Button>
        }
      </Card.Body>
    </Card>
  );
}

function App(props) {
  let [data, setData] = useState(props.initialData);

  function handleSaveCard(boardUuid, cardUuid, cardData) {
    setData(prevData => prevData.setIn([boardUuid, 'cards', cardUuid], cardData));
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
            />
          </Col>
        ).toList()}
      </Row>
    </Container>
  );
}

export default App;
