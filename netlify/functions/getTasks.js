const fs = require('fs');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = fs.readFileSync('tasks.json', 'utf8');
  return {
    statusCode: 200,
    body: data,
  };
};
