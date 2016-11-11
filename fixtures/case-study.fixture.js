describe('Case Study', () => {
    it('adding a case study', () => {
      browser.login();
      browser.url('/case-study/create');
      assert.equal(browser.getText('h1'), 'Add case study');

      // Show ErrorBox
      browser.setValue('#title', 'Integration Test Case Study');
      browser.click('[type="submit"]');
      assert(browser.isExisting('.callout--warning'));

      browser.setValue('#client', 'client field');
      browser.setValue('#timeframe', 'timeframe field');
      browser.setValue('#opportunity', 'opportunity field');
      browser.setValue('#approach', 'approach field');
      browser.setValue('#outcome', 'outcome field');

      // ErrorBox should be gone since all required fields have values.
      assert.equal(browser.isExisting('.callout--warning'), false);

      browser.click('[type="submit"]');

      // On View case study page - successfully created.
      assert.equal(browser.getText('h1'), 'Integration Test Case Study');
    });
});