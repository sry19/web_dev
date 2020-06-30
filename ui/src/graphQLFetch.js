import fetch from 'isomorphic-fetch';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    // if it is a date, return a Date object, otherwise, value remains unchanged
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

export default async function graphQLFetch(query, variables = {}, showError = null, cookie = null) {
    const apiEndpoint = (__isBrowser__) // eslint-disable-line no-undef
     ? window.ENV.UI_API_ENDPOINT : process.env.UI_SERVER_API_ENDPOINT;
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (cookie) headers.Cookie = cookie;
        {/**As for the transformation, you could, within the ui directory, either run npm run compile or npm run watch. But the API calls will fail because the endpoint /graphql has no handlers in the UI server. So, instead of making API calls to the UI server, we need to change the UI to call the API server. */}
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          if (showError) showError(`${error.message}:\n ${details}`);
        } else if (showError) {
          showError(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      if (showError) showError(`Error in sending data to server: ${e.message}`);
    }
  }