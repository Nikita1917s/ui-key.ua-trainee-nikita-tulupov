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
                    storage.splice(column, 1)
                }
                else if (payload.actionWith === 'card') {
                    storage[column].cards.splice(card, 1)
                }
            })

            let moveItem = (() => {
                if (payload.actionWith === 'column') {
                    console.log('moved', storage)
                }
                else if (payload.actionWith === 'card') {
                    console.log('moved', storage[column].cards)
                }
            })

            //Add item
            if (payload.actionType === 'add') {
                addItem()
            }
            //Edit item
            else if (payload.actionType === 'edit') {
                editItem()
            }
            //Remove item
            else if (payload.actionType === 'remove') {
                removeItem()
            }
            //Move item
            else if (payload.actionType === 'move') {
                moveItem()
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
        columns: [{ columnId: 1, columnName: 'First', cards: [{ columnId: 1, cardId: 1, cardName: 'Card 1', cardDescription: 'Des' }, { columnId: 1, cardId: 2, cardName: 'Card 2', cardDescription: 'Des2' }] }, { columnId: 2, columnName: 'Second', cards: [] },],
    },
    getters: {
        allColumns(state) {
            return state.columns
        }
    }
}