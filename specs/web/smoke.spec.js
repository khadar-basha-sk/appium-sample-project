describe('Web Smoke Suite', function () {
  it('opens the configured web application', async function () {
    await browser.url('/');
    const title = await browser.getTitle();
    if (!title) {
      throw new Error('Expected the configured web application to load with a document title');
    }
  });
});
