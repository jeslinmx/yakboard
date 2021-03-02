import { createRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Check, PencilFill, TrashFill, X } from "react-bootstrap-icons";
import { MoreActionsButton, noop, TooltipButton } from "./Misc";

export default function YakCard({
    uuid,
    title,
    index = null, // required for react-beautiful-dnd Draggable
    content, // content of card, will be rendered into markdown
    isNew = false, // if true, the card is created in edit mode, with focus on the title field
    onSave = noop, // (cardUuid, cardData) - called when the card loses focus in editing mode, or the save button is clicked
    onDelete = noop, // (cardUuid) - called when the delete button is clicked
  }) {
    // states
    let [editing, setEditing] = useState(Boolean(isNew));
    // handlers
    let handleDelete = () => onDelete(uuid);
    let handleEdit = () => setEditing(true);
    let handleCancel = () => setEditing(false);
    let handleSave = () => {
      if (isNew && !titleInput.current.value && !contentInput.current.value) {
        // if a new card is being saved, with blank title and content, treat as a delete
        onDelete(uuid);
      }
      else {
        onSave(uuid, {
          title: titleInput.current.value,
          content: contentInput.current.value,
        });
      }
      setEditing(false);
    };
    let handleBlur = e => {
      // trigger a save only if currently editing and the newly focused element is outside of the card
      if (editing && !e.currentTarget.contains(e.relatedTarget)) {
        handleSave();
      }
    };
    // refs
    let titleInput = createRef(); // handle editing of title and content using uncontrolled components
    let contentInput = createRef(); // this gives us the ability to cancel just by...cancelling

    return (
      <Draggable draggableId={uuid} index={index}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <Card className="mb-3" onBlur={handleBlur}>
              <Card.Header {...provided.dragHandleProps}>
                <Form>
                  <InputGroup>
                    {editing ?
                      <Form.Control key="editing"
                        type="text"
                        defaultValue={title} placeholder="Title" autoFocus={isNew}
                        ref={titleInput}
                      />
                      : <Form.Control key="static"
                        type="text"
                        value={title} plaintext readOnly
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
                            type="submit"
                            onClick={handleSave}
                            children={<Check />}
                          />
                        </>
                        : <MoreActionsButton variant="light">
                          <TooltipButton tooltip="Edit card" variant="info" onClick={handleEdit} children={<PencilFill />} />
                          <TooltipButton tooltip="Delete card" variant="danger" onClick={handleDelete} children={<TrashFill />} />
                        </MoreActionsButton>
                      }
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </Card.Header>
              {(content || editing) ?
                <Card.Body>
                  {editing ?
                    <Form.Control
                      as="textarea" rows={4}
                      defaultValue={content} placeholder="Details"
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
          </div>
        )}
        </Draggable>
    );
  }