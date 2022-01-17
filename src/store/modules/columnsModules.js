import axios from 'axios';
import constants from "../../modules/constants";

export default {
    actions: {
        updateStorage(context, payload) {
            let storage = context.state.columns;
            let searchID = ((data, id, keyType) => data?.findIndex((elem) => elem[keyType] === id));
            let column = searchID(storage, payload.columnId, 'columnId');
            let card = (payload.cardId) ? searchID(storage[column].cards, payload.cardId, 'cardId') : '';
            let capitalizeLetter = ((capitalizeName) => capitalizeName = capitalizeName[0].toUpperCase() + capitalizeName.slice(1));

            let addItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    storage = [...storage, { columnId: payload.columnId, columnName: capitalizeLetter(payload.columnName), cards: [] }];
                }
                else if (card === -1 && payload.actionWith === constants.actionWith.card) {
                    storage[column].cards = [...storage[column].cards, { cardId: payload.cardId, cardName: capitalizeLetter(payload.cardName), cardDescription: payload.cardDescription }];
                }
                else if (payload.actionWith === constants.actionWith.dashboard) {
                    try {
                        const params = {
                            dashboardId: payload.dashboardId,
                            dashboardName: capitalizeLetter(payload.dashboardName),
                            columns: []
                        };

                        axios.post(`${constants.api.invokeUrl}/dashboardPut`, params);
                        storage = [];
                        let localStore = (localStorage.getItem('dashboardId')) ? localStorage.getItem('dashboardId') : '';
                        localStorage.setItem('dashboardId', payload.dashboardId)

                        context.commit('updateDashboard', {
                            dashboardId: localStore,
                            dashboardName: capitalizeLetter(payload.dashboardName)
                        });
                        context.commit('updateDashboardList', [...context.state.dashboardList, {
                            dashboardId: payload.dashboardId,
                            dashboardName: capitalizeLetter(payload.dashboardName),
                            columns: []
                        }]);
                    } catch (err) {
                        console.log(`An error has occured ${err}`);
                    }
                }
            });

            let editItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    storage[column].columnName = payload.columnName;
                }
                else if (payload.actionWith === constants.actionWith.card) {
                    storage[column].cards[card].cardDescription = payload.cardDescription;
                    storage[column].cards[card].cardName = payload.cardName;
                }
            })

            let removeItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    storage.splice(column, 1);
                }
                else if (payload.actionWith === 'card') {
                    storage[column].cards.splice(card, 1);
                }
            })

            let moveItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    console.log('moved', storage);
                }
                else if (payload.actionWith === constants.actionWith.card) {
                    console.log('moved', storage[column].cards);
                }
            });

            if (payload.actionType === constants.actionType.add) {
                addItem();
            }
            else if (payload.actionType === constants.actionType.edit) {
                editItem();
            }
            else if (payload.actionType === constants.actionType.remove) {
                removeItem();
            }
            else if (payload.actionType === constants.actionType.move) {
                moveItem();
            }

            context.commit('updateColumn', storage);
        },

        async dashboardGet(state) {
            const res = await fetch(
                'https://1hdumcohc0.execute-api.us-east-2.amazonaws.com/dashboardGet'
            )
            const dashboard = await res.json();

            if (dashboard.length) {
                let localStore = (localStorage.getItem('dashboardId')) ? localStorage.getItem('dashboardId') : '';
                let searchID = ((data, id, keyType) => data?.findIndex((elem) => elem[keyType] === id));
                let dashboardIndex = searchID(dashboard, localStore, 'dashboardId');
                (dashboardIndex === -1) && (dashboardIndex = dashboard.length - 1);

                state.commit('updateColumn', dashboard[dashboardIndex].columns);
                state.commit('updateDashboard', dashboard[dashboardIndex]);
                state.commit('updateDashboardList', dashboard);
            }
        },
    },

    mutations: {
        updateColumn(state, storage) {
            state.columns = storage;
        },
        updateDashboard(state, values) {
            state.dashboardId = values.dashboardId;
            state.dashboardName = values.dashboardName;
        },
        updateDashboardList(state, values) {
            state.dashboardList = values;
        }
    },

    state: {
        dashboardId: '',
        dashboardName: '',
        dashboardList: [],
        columns: [],
        //columns: [{ columnId: 1, columnName: 'First', cards: [{ columnId: 1, cardId: 1, cardName: 'Card 1', cardDescription: 'Des' }, { columnId: 1, cardId: 2, cardName: 'Card 2', cardDescription: 'Des2' }] }, { columnId: 2, columnName: 'Second', cards: [] },],
    },

    getters: {
        allColumns(state) {
            return state.columns;
        },
        dashboardId(state) {
            return state.dashboardId;
        },
        dashboardName(state) {
            return state.dashboardName;
        },
        dashboardList(state) {
            return state.dashboardList;
        }
    }
};