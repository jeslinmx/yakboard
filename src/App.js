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
import { createRef, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, InputGroup, Overlay, OverlayTrigger, Popover, Row, Tooltip } from 'react-bootstrap';
import { Check, PencilFill, ThreeDotsVertical, TrashFill, X } from 'react-bootstrap-icons';
import Immutable from 'immutable';
import {v4 as uuidv4} from 'uuid';

let noop = () => {};

function TooltipButton({
  placement, // the OverlayTrigger receives these attributes pertaining to overlays
  tooltip,
  delay,
  trigger,
  transition = false, // https://github.com/react-bootstrap/react-bootstrap/issues/5519
  children, // the children are placed in the Button
  ...restProps // all other attributes are set on the Button
}) {
  return (<OverlayTrigger placement={placement} overlay={<Tooltip>{tooltip}</Tooltip>} delay={delay} trigger={trigger} transition={transition}>
    {({ref, ...triggerHandler}) => (
        <Button ref={ref} {...triggerHandler} {...restProps}>{children}</Button>
    )}
  </OverlayTrigger>);
}

function MoreActionsButton({
  popoverChildren,
  buttonChildren,
  ...restProps
}) {
  let [show, setShow] = useState(false);
  let buttonRef = createRef();
  let popoverRef = createRef();

  function handleBlur(e) {
    if (
      show
      && !buttonRef.current.contains(e.relatedTarget)
      && !popoverRef.current.contains(e.relatedTarget)
    ) {
      setShow(false);
    }
  }

  // popovers don't appear as children of whatever they are children of, so:
  // a simple OverlayTrigger with onBlur doesn't work; OverlayTriggers aren't elements, so do not process onBlur
  // a div with onBlur surrounding an OverlayTrigger doesn't work; e.currentTarget does not contain the popover
  // manually creating a Button and an Overlay as siblings and putting onBlur on both doesn't work; the Overlay does not contain the popover
  // putting the onBlur on the Popover doesn't work; it's a function component
  // putting it on a div inside the Popover works though.

  return (
    <>
      <Button ref={buttonRef} onBlur={handleBlur} onClick={() => setShow(!show)} {...restProps}>
        {buttonChildren}
      </Button>
      <Overlay target={buttonRef} show={show} placement="right" transition={false}>
        <Popover>
          <ButtonGroup ref={popoverRef} onBlur={handleBlur}>
            {popoverChildren}
          </ButtonGroup>
        </Popover>
      </Overlay>
    </>
  );
}

function YakCard({
  uuid,
  title,
  content, // content of card, will be rendered into markdown
  isNew = false, // if true, the card is created in edit mode, with focus on the title field
  onSave = noop, // (cardUuid, cardData) - called when the card loses focus in editing mode, or the save button is clicked
  onCancel = noop, // (cardUuid) - called when the cancel button is clicked, or a new blank card is saved
  onDelete = noop, // (cardUuid) - called when the delete button is clicked
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
  function handleDelete() {
    onDelete(uuid);
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
                <TooltipButton
                  tooltip="Cancel edits"
                  variant="outline-danger"
                  onClick={handleCancel}
                  children={<X />}
                />
                <TooltipButton
                  tooltip="Save edits"
                  variant="success"
                  onClick={handleSave}
                  children={<Check />}
                />
              </>
              : <MoreActionsButton
                variant="light"
                buttonChildren={<ThreeDotsVertical />}
                popoverChildren={
                  <>
                    <TooltipButton tooltip="Edit card" variant="info" onClick={handleEdit} children={<PencilFill />} />
                    <TooltipButton tooltip="Delete card" variant="danger" onClick={handleDelete} children={<TrashFill />} />
                  </>
                }
              />
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
  onDeleteCard = noop, // (boardUuid, cardUuid) - called when a card on this board triggers its onDelete event
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
  function handleDeleteCard(cardUuid) {
    onDeleteCard(uuid, cardUuid);
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
            onDelete={handleDeleteCard}
          />
        ).toList()}
        {newCard ?
        <YakCard
          isNew key={newCard}
          uuid={newCard}
          onSave={handleSaveCard} onCancel={handleCancelNewCard}
        />
        : <TooltipButton
          tooltip="Add new card" placement="bottom"
          block variant="outline-secondary" size="lg"
          onClick={handleAddCard}
          children="+"
        />
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
