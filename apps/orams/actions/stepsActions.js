
export const constants = {
    STEP_COMPLETE,
    STEP_PARTIAL,
    STEP_CLEAR,
    STEP_INITIAL
};

export const stepComplete = (step) => ({ type: STEP_COMPLETE, step });
export const stepPartial = (step) => ({ type: STEP_PARTIAL, step });
export const stepClear = (step) => ({ type: STEP_CLEAR, step });
export const setSteps = (data) => ({ type: STEP_INITIAL, data });

export const actions = {
  stepComplete,
  stepPartial,
  stepClear,
  setSteps
};