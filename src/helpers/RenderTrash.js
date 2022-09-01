import Componente from './Componente.js';
import { saveBoard } from './SaveBoard.js';
import CreatePreview from './CreatePreview.js';

const boardsList = document.getElementById('boards-list');

export default class RenderTrash extends Componente {
  constructor() {
    super();

    this.resetList = this.resetList.bind(this);
    this.removeBoard = this.removeBoard.bind(this);
    this.whenTheClassIsReady = this.whenTheClassIsReady.bind(this);
    this.nextListOfBoard = this.nextListOfBoard.bind(this);
    this.previousListOfBoard = this.previousListOfBoard.bind(this);

    this.state = {
      trash: [],
    };
    this.whenTheClassIsReady();
  }

  whenTheClassIsReady() {
    const trash = saveBoard.getTrash();
    this.setState({ trash, ...this.numberOfBoardThatWillBeListed(boardsList, trash) });
    this.createListingState();
  }

  nextListOfBoard() {
    const { lastIndex, numberOfBoard } = this.state;
    if (lastIndex !== numberOfBoard) {
      this.calculateNextIndex();
    }
  }

  previousListOfBoard() {
    const { firstIndex } = this.state;
    if (firstIndex) {
      this.calculatePreviousIndex();
    }
  }

  resetList() {
    const { trash } = this.state;
    this.checkIfChanged(boardsList, trash);
  }

  removeBoard(boardId) {
    console.log(boardId);
    saveBoard.removeTrashBoard(boardId);
    boardsList.querySelector(`#${boardId}`).remove();
    const trash = saveBoard.getTrash();
    this.setState({ trash });
  }

  restoreBoard(boardId) {
    saveBoard.restoreBoard(boardId);
    boardsList.querySelector(`#${boardId}`).remove();
    const trash = saveBoard.getTrash();
    this.setState({ trash });
  }

  render() {
    const { firstIndex, lastIndex } = this.state;
    const trash = saveBoard.getTrash();
    console.log('trash');
    console.log(trash);
    if (trash.length) {
      boardsList.innerHTML = '';
      trash.slice(firstIndex, lastIndex).forEach((board) => {
        const preview = new CreatePreview(board, this.restoreBoard, this.removeBoard, true);
        boardsList.appendChild(preview.renderPreview());
      });
    } else boardsList.innerHTML = '<p>Lixeira esta vaisa<p>';
  }
}