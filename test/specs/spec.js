import test from 'ava';
import ApocSidebar from '../..';

test('instance', t => {
  const error = t.throws(() => new ApocSidebar());
  t.is(error.message, 'Required element');
});
