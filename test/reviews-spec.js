describe('NY Times movie reviews', function() {
    
    beforeEach(function() {
        browser.waitForAngularEnabled(false);
        browser.get('http://127.0.0.1:5500/index.html');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('New York Times Movies Reviews');
      });
  
      it('should click the 3rd movie', function() {
        browser.driver.sleep(3000);
         element.all(by.buttonText('View')).get(2).click();
         browser.driver.sleep(3000);
        element(by.cssContainingText('[class="btn btn-primary my-2"]', 'Go Back to Main Page')).click();
        browser.driver.sleep(2000);
  
      });

      it('should search for a movie', function() {
        browser.driver.sleep(3000);
        element(by.id('searchTerm')).sendKeys('Sollers Point').click();
         browser.driver.sleep(1000);
        element(by.cssContainingText('[class="btn btn-primary my-2"]', 'Search')).click();
        browser.driver.sleep(4000);
  
      });
  });