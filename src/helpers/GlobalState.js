export default class GlobalState {
  constructor() {
    this.state = {};
    this.updatedState = () => {};
  }

  createState(state = this.state, callback) {
    this.state = state;
    if (callback) this.updatedState = callback;
    console.log('global: ', state);
  }

  async pushState(state, key) {
    const keyObj = this.state[key] ? { [key]: { ...this.state[key], ...state } } : { [key]: state };
    const obj = key ? keyObj : state;
    this.state = { ...this.state, ...obj };
    console.log('pushState: ', this.state);
    this.updatedState();
  }

  getState(callback) {
    if (callback) {
      const state = callback(this.state);
      return state;
    }
    return this.state;
  }
}

export const globalState = new GlobalState();

const INITIAL_STATE = {
  library: {
    currentLocation: 'library',
    trash: [],
    boardsList: [],
  },
};
globalState.createState(INITIAL_STATE);