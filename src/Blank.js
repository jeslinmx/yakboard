import { v4 as uuidv4 } from 'uuid';

export let BlankBoards = () => {
    let b = [[uuidv4(), 'Waiting'], [uuidv4(), 'In Progress'], [uuidv4(), 'Complete']];
    return {
        boards: b.map(([uuid, name]) => uuid),
        boardContents: Object.fromEntries(b.map(([uuid, name]) => [uuid, {
            name,
            cards: []
        }])),
        cardContents: {}
    }
}
export let BlankCard = () => Map({name: "", content: "", isNew: true});