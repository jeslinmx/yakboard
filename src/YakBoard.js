import { useState } from "react";
import { noop, TooltipButton } from "./Misc";
import {v4 as uuidv4} from 'uuid';
import { Card } from "react-bootstrap";
import YakCard from "./YakCard";

export default function YakBoard({
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