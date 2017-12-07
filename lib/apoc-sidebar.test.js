import {JSDOM} from 'jsdom';
import ApocSidebar from './apoc-sidebar';

describe('ApocSidebar', () => {
  it('throw error', () => {
    expect(() => new ApocSidebar()).toThrow();
  });

  test('postinit', async () => {
    const {document} = new JSDOM(
      '<!DOCTYPE html><div id="target" style="width:300px">Hello world</div>'
    ).window;

    const sidebar = new ApocSidebar(document.getElementById('target'));
    await sidebar.init();
    expect(sidebar.el).toBeTruthy();
    expect(sidebar).toHaveProperty('defaultStyle');
    expect(sidebar.defaultStyle._values).toMatchObject({
      width: '300px'
    });
  });
});
