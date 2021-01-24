import { noop, TooltipButton } from "./Misc";
import { Card } from "react-bootstrap";
import YakCard from "./YakCard";

export default function YakBoard({
    uuid,
    name,
    cards,
    onAddCard = noop, // (boardUuid) - called when a new card is added to this board
    onSaveCard = noop, // (boardUuid, cardUuid, cardData) - called when a card on this board triggers its onSave event
    onDeleteCard = noop, // (boardUuid, cardUuid) - called when a card on this board triggers its onDelete event
  }) {
    // handlers
    let handleAddCard = () => onAddCard(uuid);
    let handleSaveCard = (cardUuid, cardData) => onSaveCard(uuid, cardUuid, cardData);
    let handleDeleteCard = (cardUuid) => onDeleteCard(uuid, cardUuid);
  
    return (
      <Card bg="light" className="mt-4">
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