import { useState } from "react";
import { Card } from "react-bootstrap";
import { noop, TooltipButton } from "./Misc";
import YakCard from "./YakCard";

export default function YakBoard({
    uuid,
    name,
    cards,
    filter,
    onAddCard = noop, // (boardUuid, cardData) - called when a new card is added to this board
    onSaveCard = noop, // (boardUuid, cardUuid, cardData) - called when a card on this board triggers its onSave event
    onDeleteCard = noop, // (boardUuid, cardUuid) - called when a card on this board triggers its onDelete event
  }) {
    // states
    let [editingNewCard, setEditingNewCard] = useState(false);
    // handlers
    let handleAddCard = (_, cardData) => { onAddCard(uuid, cardData); setEditingNewCard(false); }
    let handleSaveCard = (cardUuid, cardData) => onSaveCard(uuid, cardUuid, cardData);
    let handleDeleteCard = (cardUuid) => onDeleteCard(uuid, cardUuid);
  
    return (
      <Card bg="light" className="mt-4">
        <Card.Header>
          <Card.Title className="text-center">{name}</Card.Title>
        </Card.Header>
        <Card.Body>
          {cards.filter(card => card.get("title").indexOf(filter) !== -1 || card.get("content").indexOf(filter) !== -1).map((card, uuid) => 
            <YakCard key={uuid}
              uuid={uuid} title={card.get('title')} content={card.get('content')}
              onSave={handleSaveCard} onDelete={handleDeleteCard}
            />
          ).toList()}
          {editingNewCard ?
            <YakCard isNew
              onSave={handleAddCard} onDelete={() => setEditingNewCard(false)}
            />
            : <TooltipButton
              block variant="outline-secondary" size="lg"
              tooltip="Add new card" placement="bottom"
              onClick={() => setEditingNewCard(true)}
              children="+"
            />
          }
        </Card.Body>
      </Card>
    );
  }