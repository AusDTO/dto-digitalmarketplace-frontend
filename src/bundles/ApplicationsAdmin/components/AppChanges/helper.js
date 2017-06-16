var jsonpatch = require('fast-json-patch');
import isEmpty from 'lodash/isEmpty';

// filter out application changes to keys we don't care about
let ignoreKeys = ["/supplier_code", "/supplier", "/submitted_at", "/status", "/seller_types/recruitment",
  "/last_update_time", "/lastUpdateTime", "/id", "/creation_time",
  "/creationTime", "/created_at", "/public_profile", "/documentsUrl", "/CaseStudyLink",
  "/contacts", "/longName", "/long_name", "/other_panels", "/website", "/travel", "/other_panels",
  "/linkedin",
  "/unassessed", "/assessed", "/frameworks", "/dsp_panel",
  "/digital_marketplace_panel", "/type", "/application_id", "/domains", "/assessed_domains", "/seller_type"
];

// we don't want to see application changes that resolve to true below
export const ignoreCriteria = (supplier, application, key) => {
  return application[key] === supplier[key] ||                 // values are unchanged from live supplier obj
    supplier[key] === '' ||
    (isEmpty(application[key]) || isEmpty(supplier[key])) ||
    supplier[key].length === 0 ||
    typeof application[key] === 'object' ||
    typeof supplier[key] === 'object';
};

export const appendIgnoredKeys = (supplier, application, ignoreKeys) => {
  let thisIgnoreKeys = Array.from(ignoreKeys);
  Object.keys(supplier).map(key => {
    if (ignoreCriteria(supplier, application, key)) {
      if(thisIgnoreKeys.indexOf('/'+key) === -1) {
        thisIgnoreKeys.push('/'+key);
      }
    }
  });

  return thisIgnoreKeys;
};

export const returnDiffedData = body => {
  if (!body.supplier_code) {
    return [];
  }

  if (body.supplier) {
      let thisIgnoreKeys = appendIgnoredKeys(body, body.supplier, ignoreKeys);
      let diffedData = jsonpatch.compare(body.supplier, body);
      return Object.values(diffedData).filter(x => {
          if (
              !thisIgnoreKeys.includes(x.path) &&
              x.op !== 'remove' &&
              x.path.match(/links/g) <= 0 &&
              x.path.match(/createdAt/g) <= 0
          ) {
              return x;
          }
      });
  }
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
