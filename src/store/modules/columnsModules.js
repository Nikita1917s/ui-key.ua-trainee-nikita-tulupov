export default {
    actions: {},
    mutations: {
        updateColumns(state, columns) {
            state.columns = [...columns, 1]
        },
        addColumns(state, newColumns) {
            state.columns.push(newColumns)
        },
    },
    state: {
        columns: [{ id: 1, name: 'first' }, { id: 2, name: 'second' },],
        cards: []
    },
    getters: {
        allColumns(state) {
            return state.columns
        },
        allCards(state) {
            return state.cards
        }
    }
}