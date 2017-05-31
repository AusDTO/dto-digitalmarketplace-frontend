import React from 'react';

import {
  returnDiffedData,
  returnUnassessedCaseStudies,
  ignoreCriteria,
  appendIgnoredKeys
} from './helper';


test('appendIgnoreKeys fn adds fields with unchanged value to ignoreKeys array', () => {
  let staticIgnoreKeys = Array.from(["/linkedin", "/assessed"]);  // initial length === 2

  let supplier = {
    "abn": "74 490 121 060",                        // same --> add to ignoreKeys
    "case_studies/0/title": "Application Title",    // different string value --> don't append to ignoreKeys,
    "address": {},                                 // address is an empty obj --> add to ignoreKeys
    "awards": [],                                   // awards is an empty array (awards.length) --> add to ignoreKeys,
  };

  let application = {
    "abn": "74 490 121 060",
    "case_studies/0/title": "Supplier Title",
  };

  let newIgnoredKeys = appendIgnoredKeys(supplier, application, staticIgnoreKeys);
  expect(newIgnoredKeys.length).toEqual(5);
});


test('returnDiffedData fn returns diff array excluding keys in ignoreKeys array', () => {

  let body = {
    "abn": "74 490 121 060",                          // aka 'application'
    "case_studies": {                                 // different
      "0": {
        "title": "Application Title"
      }
    },
    "summary": "New application summary",
    "address": {
      "links": 'www.someinterwebs2dot0.io',          // regex ignores anything containing 'link'
      "notALinkKey": "application"
    },
    "supplier_code": 2,                               // need this to know there is a supplier obj to diff against
    "supplier": {
      "abn": "74 490 121 060",                        // same --> excluded from diffData
      "case_studies": {},
      "address": {},                                  // address is an empty obj --> excluded from diffData
      "awards": [],                                    // awards is an mt array (awards.length) --> excluded from diffData
      "linkedin": "http://linkedin.com/profile/bob",    // in ignoreKeys
      "summary": 'Old assessed summary',
      "address": {
        "links": 'www.someinterwebs.io',
        "notALinkKey": "supplier"
      }
    }
  };

  let expectedDiffData = [
    {
      "op": 'replace',
      "path": '/summary',
      "value": 'New application summary'
    },
    {
      "op": "replace",
      "path": "/address/notALinkKey",
      "value": "application",
    },
    {
      "op": 'add',
      "path": '/case_studies/0',
      "value": {
        "title": "Application Title"
      }
    },
  ];

  let diffData = returnDiffedData(body);

  expect(diffData).toEqual(expectedDiffData);
});

