const dns = require('dns');

// Function to perform DNS lookup for a domain
function performDnsLookup(domain) {
  dns.lookup(domain, (err, address, family) => {
    if (err) {
      console.error(`Error performing DNS lookup for ${domain}: ${err.message}`);
    } else {
      console.log(`IP address for ${domain}: ${address}`);
      console.log(`IP version: IPv${family}`);
    }
  });
}

// Replace 'example.com' with the domain you want to look up
const domainToLookup = 'help.smokecartel.com';

// Call the function to perform DNS lookup
performDnsLookup(domainToLookup);
