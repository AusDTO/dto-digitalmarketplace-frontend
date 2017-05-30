var jsonpatch = require('fast-json-patch');
import isEmpty from 'lodash/isEmpty';

// filter out application changes to keys we don't care about
let ignoreKeys = ["/supplier_code", "/supplier", "/submitted_at", "/status", "/seller_types/recruitment",
  "/links/supplier", "/links/self", "/last_update_time", "/lastUpdateTime", "/id", "/creation_time",
  "/creationTime", "/created_at", "/createdAt", "/public_profile", "/documentsUrl", "/CaseStudyLink",
  "/case_studies/11e27ef8-691b-38c9-4691-f48e6eef031e", "/case_studies/4/links/supplier",
  "/case_studies/4/links/self", "/case_studies/3/links/supplier", "/case_studies/3/links/self",
  "/case_studies/2/links/supplier", "/case_studies/2/links/self", "/case_studies/1/links/supplier",
  "/case_studies/1/links/self", "/case_studies/0/links/supplier", "/case_studies/0/links/self", "/contacts",
  "/longName", "/long_name", "/other_panels", "/addresses/0/links/self", "/addresses/0/links/supplier",
  "/unassessed", "/assessed", "/frameworks", "/dsp_panel",
  "/digital_marketplace_panel", "/type", "/application_id", "/domains", "/assessed_domains", "/seller_type"
];

// we don't want to see application changes that resolve to true below
const ignoreCriteria = (application, supplier, key) => {
  return application[key] === supplier[key] ||                  // values are unchanged from live supplier obj
    (isEmpty(application[key]) || isEmpty(supplier[key])) ||    // value of both is an empty obj
    typeof application[key] === 'object' ||                     // mvp2 does not yet handle diffing nested objs
    typeof supplier[key] === 'object';
};

const appendIgnoredFields = (application, supplier) => {
  let thisIgnoreKeys = Array.from(ignoreKeys);
  Object.keys(application).map(key => {
    if (ignoreCriteria(application, supplier, key)) {
      thisIgnoreKeys.push('/' + key);
    }
  });
  return thisIgnoreKeys
};

export const returnDiffedData = body => {
  if (!body.supplier_code) { return []};
  let thisIgnoreKeys = appendIgnoredFields(body, body.supplier);
  let diffedData = jsonpatch.compare(body, body.supplier);
  return Object.values(diffedData).filter(x => {
    if (!thisIgnoreKeys.includes(x.path)) {
      return x;
    }
  });
};

const addApplicationUUID = originalCaseStudies => {
  let withUUIDs = Object.assign({}, originalCaseStudies);
  Object.entries(withUUIDs).map(x => {
    if (x[0].length > 1) {
      x[1].uuid = x[0];
    }
  });
  return withUUIDs;
};

export const returnUnassessedCaseStudies = applicationCaseStudies => {
  let appCaseStudies = addApplicationUUID(applicationCaseStudies);
  return (!appCaseStudies ? [] : Object.values(appCaseStudies).filter(study => !study.id));
};