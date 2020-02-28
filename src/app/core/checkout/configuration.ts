import { Machine } from '../../library/state-machine/StateMachine';
import {
  transitions,
  Action,
  State,
  T as Transition,
  V as Vertex,
  Item,
} from './logic';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Transition.ADD_ITEM:
      if (state.items.findIndex((item: Item) => item.id === action.payload.item.id) === -1) {
        return {
          ...state,
          items: state.items.concat([ action.payload.item ])
        };
      } else {
        return state;
      }
    case Transition.REMOVE_ITEM:
      const items = state.items.filter((item: Item) => item.id !== action.payload.item.id);

      return {
        ...state,
        items: items.concat([])
      };
  }

  return state;
}

export type CheckoutMachine = Machine<Vertex, Transition, State, Action>;

export const genericCheckoutMachine = (): CheckoutMachine =>
  new Machine<Vertex, Transition, State, Action>(
    { items: [] },
    Vertex.EMPTY_CART,
    transitions,
    reducer
  );
