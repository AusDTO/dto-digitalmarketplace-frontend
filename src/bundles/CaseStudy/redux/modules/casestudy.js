export const ASSESSMENT_SAVED = 'ASSESSMENT_SAVED';

export const assessmentSaved = (data) => ({ type: ASSESSMENT_SAVED, data });

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    default:
      state.assessmentForm = {
        status: 'unassessed'
      }
      return state;
  }
}


export const assessmentSave = (assessment) => {
  return (dispatch, getState, api) => {
    const state = getState();
    let { 
      casestudy, 
      caseStudyAssessment = {} 
    } = state;

    let approved_criteria = []
    for (let ac in assessment.approved_criteria) {
      approved_criteria.push(ac)
    }
    let toSave = {
      approved_criteria: approved_criteria,
      status: assessment.status,
      comment: assessment.comment
    }
    // if (!casestudy.assessments) {
    //   casestudy.assessments = []
    // }
    // for (let a in assessment) {
    //   if (assessment[a]) {
    //     caseStudyAssessment[a] = true
    //   }
    // }
    casestudy.assessments.push(caseStudyAssessment)
    // try {
    //   JSON.parse(application.jsonData);
    // } catch (e) {
    //   return dispatch(appSaveFailed({
    //     error: e.message,
    //     application: application
    //   }));
    // }
    // return api(state.meta.url_app_update, {
    //   method: 'POST',
    //   body: application.jsonData,
    //   headers: {
    //     // Flask expects the token as a header.
    //     'X-CSRFToken': state.form_options.csrf_token
    //   }
    // })
    //   .then((response) => {
    //     if (response.status != 200) {
    //       return response
    //         .text()
    //         .then((text) => {
    //           return dispatch(appSaveFailed({
    //             error: text,
    //             application: application
    //           }));
    //         });
    //     }
    //     return response
    //       .json()
    //       .then((json) => {
    //         if (json.errors) {
    //           return dispatch(appSaveFailed({
    //             error: json.errors.map(i=>i.message).join('<br/>'),
    //             application: application
    //           }));
    //         } else {
    //           return dispatch(appSaved(json));
    //         }
    //       })
    //   })
  }
};
