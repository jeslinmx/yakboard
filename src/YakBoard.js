import { noop, TooltipButton } from "./Misc";
import {v4 as uuidv4} from 'uuid';
import { Card } from "react-bootstrap";
import YakCard from "./YakCard";
import { BlankCard } from "./Blank";

export default function YakBoard({
    uuid,
    name,
    cards,
    onSaveCard = noop, // (boardUuid, cardUuid, cardData) - called when a card on this board triggers its onSave event
    onDeleteCard = noop, // (boardUuid, cardUuid) - called when a card on this board triggers its onDelete event
  }) {
  
    let handleAddCard = () => onSaveCard(uuid, uuidv4(), BlankCard().set("isNew", true));
    let handleSaveCard = (cardUuid, cardData) => onSaveCard(uuid, cardUuid, cardData);
    let handleDeleteCard = (cardUuid) => onDeleteCard(uuid, cardUuid);
  
    return (
      <Card bg="light" className="mt-3">
        <Card.Header>
          <Card.Title className="text-center">{name}</Card.Title>
        </Card.Header>
        <Card.Body>
          {cards.map((card, uuid) => 
            <YakCard key={uuid}
              uuid={uuid} title={card.get('title')} content={card.get('content')}
              isNew={card.has("isNew")}
              onSave={handleSaveCard} onDelete={handleDeleteCard}
            />
          ).toList()}
          <TooltipButton
            block variant="outline-secondary" size="lg"
            tooltip="Add new card" placement="bottom"
            onClick={handleAddCard}
            children="+"
          />
        </Card.Body>
      </Card>
    );
  }