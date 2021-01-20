import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Immutable from 'immutable';
import {v4 as uuidv4} from 'uuid';
import reportWebVitals from './reportWebVitals';

let waiting = Immutable.OrderedMap([
  [uuidv4(), Immutable.Map({
    title: "Test card 1",
    content: "test card 1 content",
  })],
  [uuidv4(), Immutable.Map({
    title: "Test card 2",
    content: "test card 2 content",
  })],
  [uuidv4(), Immutable.Map({
    title: "Test card 3",
    content: "test card 3 has a lot more content content content",
  })],
]);
let progress = Immutable.OrderedMap([
  [uuidv4(), Immutable.Map({
    title: "ughhhhh",
    content: "currently in progress...",
  })],
]);
let completed = Immutable.OrderedMap([
  [uuidv4(), Immutable.Map({
    title: "all done!",
    content: "now time to do some more...",
  })],
]);
let boards = Immutable.OrderedMap([
  [uuidv4(), Immutable.Map({
    name: "Waiting",
    cards: waiting,
  })],
  [uuidv4(), Immutable.Map({
    name: "In progress",
    cards: progress,
  })],
  [uuidv4(), Immutable.Map({
    name: "Completed",
    cards: completed,
  })],
]);

ReactDOM.render(
  <React.StrictMode>
    <App initialData={boards} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
