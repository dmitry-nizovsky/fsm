import { TransitionType, configureActionCreator } from '../../library/state-machine/StateMachine';

// Transition I call this enum T just for avoid long string in transition table and for V (Vertex) too.
export enum T {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  TO_PAYMENT = 'TO_PAYMENT',
  TO_PENDING_PAYMENT = 'TO_PENDING_PAYMENT',
  TO_SUCCESS_PAYMENT = 'TO_SUCCESS_PAYMENT',
  TO_FAIL_PAYMENT = 'TO_FAIL_PAYMENT',
}
// Vertex.
export enum V {
  EMPTY_CART = 'EMPTY_CART',
  LIST_CART = 'LIST_CART',
  START_PAYMENT = 'START_PAYMENT',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  SUCCESS_PAYMENT = 'SUCCESS_PAYMENT',
  FAIL_PAYMENT = 'FAIL_PAYMENT',
}

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
export interface State {
  items: Item[];
}

export const transitions: TransitionType<T, V, State>[] = [
  { type: T.ADD_ITEM,           from: V.EMPTY_CART,      to: V.LIST_CART       },
  { type: T.ADD_ITEM,           from: V.LIST_CART,       to: V.LIST_CART       },
  { type: T.REMOVE_ITEM,        from: V.LIST_CART,       to: V.LIST_CART,      condition: (state: State) => state.items.length > 1   },
  { type: T.REMOVE_ITEM,        from: V.LIST_CART,       to: V.EMPTY_CART,     condition: (state: State) => state.items.length === 1 },
  { type: T.TO_PAYMENT,         from: V.LIST_CART,       to: V.START_PAYMENT   },
  { type: T.TO_PENDING_PAYMENT, from: V.START_PAYMENT,   to: V.PENDING_PAYMENT },
  { type: T.TO_SUCCESS_PAYMENT, from: V.PENDING_PAYMENT, to: V.SUCCESS_PAYMENT },
  { type: T.TO_FAIL_PAYMENT,    from: V.PENDING_PAYMENT, to: V.FAIL_PAYMENT    },
];

const createAction = configureActionCreator<T>();

export const add = (item: Item) =>
  createAction(T.ADD_ITEM, { item });

export const remove = (item: Item) =>
  createAction(T.REMOVE_ITEM, { item });

export const startPayment = () =>
  createAction(T.TO_PAYMENT, {});

export const pendingPayment = () =>
  createAction(T.TO_PENDING_PAYMENT, {});

export const successPayment = () =>
  createAction(T.TO_SUCCESS_PAYMENT, {});

export const failPayment = () =>
  createAction(T.TO_FAIL_PAYMENT, {});

export const actions = {
  add,
  remove,
  startPayment,
  pendingPayment,
  successPayment,
  failPayment
};

export type Action = ReturnType<typeof actions[keyof typeof actions]>;
