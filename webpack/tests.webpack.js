var context = require.context('../tests/client', true, /-test.js$/);
context.keys().forEach(context);
