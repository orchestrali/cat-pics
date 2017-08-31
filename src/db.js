const { URL } = require('url');
const baseID = (new URL(process.env.AIRTABLE_BASE_URL)).pathname.split("/")[1];

module.exports = require('airtable').base(baseID);