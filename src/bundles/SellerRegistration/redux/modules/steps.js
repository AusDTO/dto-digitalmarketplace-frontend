const STEP_COMPLETE = 'step/complete';
const STEP_PARTIAL = 'step/partial';
const STEP_INITIAL = 'step/initial';

export const STATUS = {
  complete: 'complete',
  partial: 'partial'
};

export default function reducer(state = {}, action = {}) {
  const { type, step, data } = action;
  switch (type) {
    case STEP_COMPLETE:
      return Object.assign({}, state, {
        [step]: STATUS.complete
      });
    case STEP_PARTIAL:
      return Object.assign({}, state, {
        [step]: STATUS.partial
      });
    case STEP_INITIAL:
      return data;
    default:
      return state;
  }
};


export const stepComplete = (step) => ({ type: STEP_COMPLETE, step });
export const stepPartial = (step) => ({ type: STEP_PARTIAL, step });
export const setSteps = (data) => ({ type: STEP_INITIAL, data });

export const actions = {
  stepComplete,
  stepPartial,
  setSteps
};