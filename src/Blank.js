import { Map, Seq } from "immutable";
import { v4 as uuidv4 } from 'uuid';

export let BlankBoards = () => Seq(['Waiting', 'In Progress', 'Completed']).map(name => ({name, cards: {}})).toKeyedSeq().flip().map(value => uuidv4()).flip().toJS();
export let BlankCard = () => Map({name: "", content: "", isNew: true});