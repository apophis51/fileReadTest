const dns = require('dns');

const domain = 'filereadtest-production.up.railway.app';

dns.lookup(domain, (err, address, family) => {
  if (err) {
    console.error(`Error resolving IP for ${domain}:`, err);
  } else {
    console.log(`IP address for ${domain}: ${address}`);
  }
});