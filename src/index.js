import './index.css';
import DOMManipulator from './modules/addScore.js';

const dom = new DOMManipulator();
dom.addSubmitListener();
dom.populateScoreBoard();
dom.addRefreshListener();