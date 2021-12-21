export default {
    actions: {
        functionCard(context, payload) {
            let storage = payload.data;
            let searchID = ((data, id, type) => data?.findIndex((elem) => elem[type] === id))
            let column = searchID(storage, payload.columnId, 'columnId')
            let card = searchID(storage[column].cards, payload.cardId, 'cardId')

            //Add card
            if (card === -1) {
                storage[column].cards = [...storage[column].cards, { cardId: payload.cardId, cardName: payload.cardName, cardDescription: payload.cardDescription }]
            }
            //Edit card
            else if (!payload.remove) {
                storage[column].cards[card].cardDescription = payload.cardDescription
                storage[column].cards[card].cardName = payload.cardName
            }
            //Remove card
            else if (payload.remove) {
                //storage[column].cards[card].cardDescription = payload.cardDescription
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