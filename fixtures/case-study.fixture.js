describe('Case Study', () => {
    it('adding, editing, deleting a case study', () => {
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

      // Publish case study
      browser.click('[type="submit"]');

      // On View case study page - successfully created.
      assert.equal(browser.getText('h1'), 'Integration Test Case Study');
      assert.equal(browser.getText('main header p'), 'client field');
      assert.equal(browser.getText('article section:nth-child(3) ul li:nth-child(1)'), 'outcome field');

      // Edit case study
      browser.click('.actions a');
      browser.setValue('#title', 'Edited Integration Test Case Study');
      browser.setValue('#client', 'edited client field');
      browser.setValue('#outcome', 'edited outcome field');

      // Submit changes
      browser.click('[type="submit"]');

      // Check changes reflect.
      assert.equal(browser.getText('h1'), 'Edited Integration Test Case Study');
      assert.equal(browser.getText('main header p'), 'edited client field');
      assert.equal(browser.getText('article section:nth-child(3) ul li:nth-child(1)'), 'edited outcome field');

      // Delete case study
      browser.click('.actions button');
      assert.equal(browser.getText('#callout--success__heading'), 'Are you sure you want to delete this case study?');

      // Cancel delete
      assert.equal(browser.getText('.callout--warn button'), 'No, keep this case study');
      browser.click('.callout--warn button');

      // Warning should disappear.
      assert.equal(browser.isExisting('.callout--warning'), false);

      // Delete again
      browser.click('.actions button');
      assert.equal(browser.getText('#callout--success__heading'), 'Are you sure you want to delete this case study?');

      // Confirm delete
      browser.click('.callout--warn a[role="button"]');

      // Application has confirmed the delete. Test successful.
      assert.equal(browser.getText('#callout--success__heading'), 'The case study Edited Integration Test Case Study has been deleted');
    });
});