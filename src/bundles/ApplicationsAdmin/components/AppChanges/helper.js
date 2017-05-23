var jsonpatch = require('fast-json-patch');

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

export const returnDiffedData = body => {
  if(!body.supplier_code) { return []}
  let diffedData = jsonpatch.compare(body, body.supplier);
  return Object.values(diffedData).filter(x => {
    if (!ignoreKeys.includes(x.path)) {
      return x
    }
  })
};

const addApplicationUUID = originalCaseStudies => {
  let withUUIDs = Object.assign({}, originalCaseStudies);
  Object.entries(withUUIDs).map(x => {
    if (x[0].length > 1) {
      x[1]['uuid'] = x[0]
    }
  });
  return withUUIDs
};

export const returnUnassessedCaseStudies = applicationCaseStudies => {
  let appCaseStudies = addApplicationUUID(applicationCaseStudies);
  return (!appCaseStudies ? [] : Object.values(appCaseStudies).filter(study => !study.id))
}