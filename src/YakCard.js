import { Map } from "immutable";
import { createRef, useState } from "react";
import { Card, Form, InputGroup } from "react-bootstrap";
import { Check, PencilFill, ThreeDotsVertical, TrashFill, X } from "react-bootstrap-icons";
import { MoreActionsButton, noop, TooltipButton } from "./Misc";

export default function YakCard({
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
        onSave(uuid, Map({
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
          <Form>
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
                      type="submit"
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
          </Form>
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