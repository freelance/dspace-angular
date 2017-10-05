import { browser, element, by } from 'protractor';
import { promise } from 'selenium-webdriver';

export class ProtractorPage {
  SEARCH = '/search';

  navigateToSearch() {
    return browser.get(this.SEARCH);
  }

  navigateToSearchWithQueryParameter(query: string) {
    return browser.get(this.SEARCH + '?query=' + query);
  }

  navigateToSearchWithScopeParameter(scope: string) {
    return browser.get(this.SEARCH + '?scope=' + scope);
  }

  getCurrentScope(): promise.Promise<string> {
    return element(by.tagName('select')).getAttribute('value');
  }

  getCurrentQuery(): promise.Promise<string> {
    return element(by.tagName('input')).getAttribute('value');
  }

  setCurrentScope(scope: string) {
    element(by.css('option[value="' + scope + '"]')).click();
  }

  setCurrentQuery(query: string) {
    element(by.css('input[name="query"]')).sendKeys(query);
  }

  submitSearchForm() {
    element(by.css('button.search-button')).click();
  }

  getRandomScopeOption(): promise.Promise<string> {
    const options = element(by.css('select[name="scope"]')).all(by.tagName('option'));
    return options.count().then((c: number) => {
      const index: number = Math.floor(Math.random() * c);
      return options.get(index).getAttribute('value');
    });
  }

}
