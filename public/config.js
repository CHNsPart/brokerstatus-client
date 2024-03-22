/* eslint-disable no-unused-vars */
var DEFAULT_THEME = 'cmls';
var TENANT_ID;
var PRIVACY_LINK = '#'
var TERMS_LINK = '#'
var RATE_LINK = '#'
var GLOBAL_API_BASE_URL = 'https://unifi-api-brokerui-dev.azurewebsites.net'

switch (DEFAULT_THEME) {
    case 'cmls':
      TENANT_ID=1;
      break;
    case 'strive':
      TENANT_ID=2
      break;
    case 'intellifi':
      TENANT_ID=3
      break;
    case 'peoples':
      TENANT_ID=4
      break;
    default:
      TENANT_ID=1
}
