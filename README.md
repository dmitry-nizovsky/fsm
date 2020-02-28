# My Pet Project need just for testing concept FSM organization for business logic my app

## My Goal

I want understand principle finite state machine (FSM) and types of FSM and use them for describe business logic. I want to describe the logic as clear as possible for the whole team. I believe what can do it with FSM and describe logic in transition table with all possible state of use cases.

### Example

```
// Transition.
T {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  TO_PAYMENT = 'TO_PAYMENT',
  TO_PENDING_PAYMENT = 'TO_PENDING_PAYMENT',
  TO_SUCCESS_PAYMENT = 'TO_SUCCESS_PAYMENT',
  TO_FAIL_PAYMENT = 'TO_FAIL_PAYMENT',
}
// Vertex.
V {
  EMPTY_CART = 'EMPTY_CART',
  LIST_CART = 'LIST_CART',
  START_PAYMENT = 'START_PAYMENT',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  SUCCESS_PAYMENT = 'SUCCESS_PAYMENT',
  FAIL_PAYMENT = 'FAIL_PAYMENT',
}
[
  { type: T.ADD_ITEM,           from: V.EMPTY_CART,      to: V.LIST_CART       },
  { type: T.ADD_ITEM,           from: V.LIST_CART,       to: V.LIST_CART       },
  { type: T.REMOVE_ITEM,        from: V.LIST_CART,       to: V.LIST_CART,      condition: (state: State) => state.items.length > 1   },
  { type: T.REMOVE_ITEM,        from: V.LIST_CART,       to: V.EMPTY_CART,     condition: (state: State) => state.items.length === 1 },
  { type: T.TO_PAYMENT,         from: V.LIST_CART,       to: V.START_PAYMENT   },
  { type: T.TO_PENDING_PAYMENT, from: V.START_PAYMENT,   to: V.PENDING_PAYMENT },
  { type: T.TO_SUCCESS_PAYMENT, from: V.PENDING_PAYMENT, to: V.SUCCESS_PAYMENT },
  { type: T.TO_FAIL_PAYMENT,    from: V.PENDING_PAYMENT, to: V.FAIL_PAYMENT    },
];
```
