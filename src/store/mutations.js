export default {
  toggleNavbar(state) {
    state.isNavOpened = !state.isNavOpened;
  },
  createNewList(state, payload) {
    state.lastListId++;
    const list = {
      id: state.lastListId,
      name: payload,
    };
    state.lists.push(list);
  },
  createNewCard(state, payload) {
    state.lastCardId++;
    const card = {
      listId: payload.listId,
      id: this.lastCardId,
      name: payload.name,
    };
    state.cards.push(card);
  },
  toggleOverlay(state) {
    state.overlay = !state.overlay;
  },
  openForm(state, payload) {
    state.currentData = payload;
  },
  saveCard(state, payload) {
    state.cards = state.cards.map((card) => {
      if (card.id === payload.id) {
        return Object.assign({}, card, payload);
      }
      return card;
    });
  },
  deleteCard(state, payload) {
    const indexToDelete = state.cards
      .map((card) => card.id)
      .indexOf(payload.id);
    state.cards.splice(indexToDelete, 1);
  },
};
