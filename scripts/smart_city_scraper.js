// Requirements:
// brew install phantomjs
// 
// Usage:
// phantomjs scripts/smart_city_scraper.js > apps/marketplace/components/Collaborate/funded.json
// 
// Debugging:
// add "page.onConsoleMessage = function (msg) { console.log(msg); }" before page.open

"use strict";
var page = require('webpage').create();

page.open('https://cities.infrastructure.gov.au/smart-cities-program', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        var ua = page.evaluate(function () {
            var text = [];
            var states = [];
            var records = [];
            rows = document.querySelectorAll('#project_description_text > div.description.parent-description > div.truncated-description > table > tbody > tr');
            var state;

            var record;
            for (var i = 0, row; i < rows.length; i++) {
                row = rows[i];

                topHeader = row.querySelector("td[style='background-color: rgb(247, 218, 100);']")
                stateHeader = row.querySelector("td[style='background-color: rgb(209, 213, 216);']")
                projectData = row.querySelectorAll("td[style='background-color: rgb(239, 239, 239);']")
                projectDescription = row.querySelector("td[colspan='6']:not([style])")
                
                if (topHeader) {
                    continue;
                } else if (stateHeader) {
                    switch (stateHeader.innerText.trim()) {
                        case 'Australian Capital Territory':
                            state = "act";
                            break;
                        case 'New South Wales':
                            state = "nsw";
                            break;
                        case 'Northern Territory':
                            state = "nt";
                            break;
                        case 'Queensland':
                            state = "qld";
                            break;
                        case 'South Australia':
                            state = "sa";
                            break;
                        case 'Tasmania':
                            state = "tas";
                            break;
                        case 'Western Australia':
                            state = "wa";
                            break;
                        case 'Victoria':
                            state = "vic";
                            break;
                        default:
                            state = 'State not found';
                            break;
                    }
                    states.push(stateHeader.innerText);
                } else if (projectData && projectData.length == 6) {
                    record = {
                        state: state,
                        title: projectData[0].innerText.trim(),
                        applicant: projectData[1].innerText.trim(),
                        location: projectData[2].innerText.trim(),
                        grant: projectData[3].innerText.trim(),
                        contribution: projectData[4].innerText.trim(),
                        total: projectData[5].innerText.trim(),
                    };
                } else if (projectDescription && record) {
                    record.description = projectDescription.innerText.trim();
                    records.push(record);
                    record = null;
                }
            }
            records = records.sort(function(a, b) {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            })
            return records;
        });
        console.log(JSON.stringify(ua, undefined, 2));
    }
    phantom.exit();
});
