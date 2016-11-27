const STEP_COMPLETE = 'step/complete';
const STEP_PARTIAL = 'step/partial';

export const STATUS = {
  complete: 2,
  partial: 1,
  pristine: 0
};

export default function reducer(state = {}, action = {}) {
  const { type, step } = action;
  switch (type) {
    case STEP_COMPLETE:
      return Object.assign({}, state, {
        [step]: STATUS.complete
      });
    case STEP_PARTIAL:
    return Object.assign({}, state, {
        [step]: STATUS.partial
      });
    default:
      return state;
  }
};


export const stepComplete = (step) => ({ type: STEP_COMPLETE, step });
export const stepPartial = (step) => ({ type: STEP_PARTIAL, step });