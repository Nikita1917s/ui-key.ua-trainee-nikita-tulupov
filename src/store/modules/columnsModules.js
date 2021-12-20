export default {
    actions: {
        functionCard(context, payload) {
            let storage = [...payload.data];
            let searchID = ((data, id) => data?.findIndex((elem) => elem.columnId === id))
            let column = searchID(storage, payload.columnId)
            let card = searchID(storage, storage[column].cardId)

            //Check if cart exists 
            if (card === -1) {
                storage[column].cards = [...storage[column].cards, { cardId: payload.cardId, cardName: payload.cardName, cardDescription: payload.cardDescription }]
            }
            context.commit('updateColumn', storage)
        }


    },
    mutations: {
        updateColumn(state, storage) {
            state.columns = (storage)
        },

        addColumns(state, newColumns) {
            state.columns.push(newColumns)
        },

    },
    state: {
        columns: [{ columnId: 1, columnName: 'First', cards: [] }, { columnId: 2, columnName: 'Second', cards: [] },],
    },
    getters: {
        allColumns(state) {
            return state.columns
        }
    }
}