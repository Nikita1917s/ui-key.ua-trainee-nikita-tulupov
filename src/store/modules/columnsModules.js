export default {
    actions: {
        updateStorage(context, payload) {
            let storage = payload.data;
            let searchID = ((data, id, type) => data?.findIndex((elem) => elem[type] === id))
            let column = searchID(storage, payload.columnId, 'columnId')
            let card = (payload.cardId) ? searchID(storage[column].cards, payload.cardId, 'cardId') : ''

            let addItem = (() => {
                if (payload.actionWith === 'column') {
                    storage = [...storage, { columnId: payload.columnId, columnName: payload.columnName, cards: [] }]
                }
                else if (card === -1 && payload.actionWith === 'card') {
                    storage[column].cards = [...storage[column].cards, { cardId: payload.cardId, cardName: payload.cardName, cardDescription: payload.cardDescription }]
                }
            })

            let editItem = (() => {
                if (payload.actionWith === 'column') {
                    storage[column].columnName = payload.columnName
                }
                else if (payload.actionWith === 'card') {
                    storage[column].cards[card].cardDescription = payload.cardDescription
                    storage[column].cards[card].cardName = payload.cardName
                }
            })

            let removeItem = (() => {
                if (payload.actionWith === 'column') {
                    console.log(payload.columnName, 'remove')
                }
                else if (payload.actionWith === 'card') {
                    console.log()
                }
            })

            //Add card
            if (payload.actionType === 'add') {
                addItem()
            }
            //Edit card
            else if (payload.actionType === 'edit') {
                editItem()
            }
            //Remove card
            else if (payload.actionType === 'remove') {
                removeItem()
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