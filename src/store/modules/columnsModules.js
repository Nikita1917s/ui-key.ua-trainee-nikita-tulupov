import axios from 'axios';
import constants from "../../modules/constants";

export default {
    actions: {
        updateStorage(context, payload) {
            let storage = context.state.columns;
            let dashboardId = payload.dashboardId ? payload.dashboardId : context.state.dashboardId;
            let dashboardName = payload.dashboardName ? payload.dashboardName : context.state.dashboardName;
            let searchID = ((data, id, keyType) => data?.findIndex((elem) => elem[keyType] === id));
            let dashboardItem = searchID(context.state.dashboardList, dashboardId, 'dashboardId');
            let column = searchID(storage, payload.columnId, 'columnId');
            let card = (payload.cardId) ? searchID(storage[column].cards, payload.cardId, 'cardId') : '';
            let capitalizeLetter = ((capitalizeName) => capitalizeName = capitalizeName[0].toUpperCase() + capitalizeName.slice(1));

            let updateDb = (() => {
                try {
                    const params = {
                        dashboardId: dashboardId,
                        dashboardName: dashboardName,
                        columns: context.state.dashboardList[dashboardItem].columns
                    };

                    (dashboardId === context.state.dashboardId) && (params.columns = storage,
                        context.commit('updateDashboard', {
                            dashboardId: dashboardId,
                            dashboardName: dashboardName
                        }))
                    axios.patch(`${constants.api.invokeUrl}/dashboardUpdate`, params);
                } catch (err) {
                    console.log(`An error has occured ${err}`);
                }

                context.state.dashboardList[dashboardItem].dashboardName = dashboardName;
                context.commit('updateDashboardList', context.state.dashboardList);
            })

            let addItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    storage = [...storage, { columnId: payload.columnId, columnName: capitalizeLetter(payload.columnName), cards: [] }];
                    updateDb();
                }
                else if (card === -1 && payload.actionWith === constants.actionWith.card) {
                    storage[column].cards = [...storage[column].cards, { cardId: payload.cardId, cardName: capitalizeLetter(payload.cardName), cardDescription: payload.cardDescription }];
                    updateDb();
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
                        localStorage.setItem('dashboardId', payload.dashboardId);
                        let localStore = (localStorage.getItem('dashboardId')) ? localStorage.getItem('dashboardId') : '';

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
                updateDb();
            })

            let removeItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    storage.splice(column, 1);
                    updateDb();
                }
                else if (payload.actionWith === constants.actionWith.card) {
                    storage[column].cards.splice(card, 1);
                    updateDb();
                }
                else if (payload.actionWith === constants.actionWith.dashboard) {
                    try {
                        axios.delete(`${constants.api.invokeUrl}/dashboardDelete`, { data: payload });
                    } catch (err) {
                        console.log(`An error has occured ${err}`);
                    }
                    context.state.dashboardList.splice(dashboardItem, 1);
                    context.commit('updateDashboardList', context.state.dashboardList);
                }
            });

            let moveItem = (() => {
                if (payload.actionWith === constants.actionWith.column) {
                    console.log('moved', storage);
                }
                else if (payload.actionWith === constants.actionWith.card) {
                    console.log('moved', storage[column].cards);
                }
                updateDb();
            });

            let selectItem = (() => {
                if (payload.actionWith === constants.actionWith.dashboard) {
                    let dashboard;
                    console.log(payload.dashboardId);

                    axios.get(`${constants.api.invokeUrl}/dashboardGetItem/${payload.dashboardId}`)
                        .then(function (response) {
                            dashboard = response.data;
                        })
                        .catch(function (err) {
                            console.log(`An error has occured ${err}`);
                        })
                        .then(function () {
                            storage = dashboard.columns;

                            localStorage.setItem('dashboardId', dashboard.dashboardId);
                            let localStore = (localStorage.getItem('dashboardId')) ? localStorage.getItem('dashboardId') : '';

                            context.commit('updateDashboard', {
                                dashboardId: localStore,
                                dashboardName: dashboard.dashboardName
                            });

                            context.state.dashboardList[dashboardItem].columns = dashboard.columns;
                            context.commit('updateDashboardList', context.state.dashboardList);
                            context.commit('updateColumn', storage);
                        })
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
            else if (payload.actionType === constants.actionType.select) {
                selectItem();
            }
            context.commit('updateColumn', storage);
        },

        async dashboardGet(state) {
            const res = await fetch(
                `${constants.api.invokeUrl}/dashboardGet`
            );
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