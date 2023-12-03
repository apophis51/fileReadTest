const dns = require('dns');

function reverseDnsLookup(ipAddress) {
  return new Promise((resolve, reject) => {
    dns.reverse(ipAddress, (err, hostnames) => {
      if (err) {
        reject(err);
      } else {
        resolve(hostnames);
      }
    });
  });
}

const ipAddress = '23.227.38.32';

reverseDnsLookup(ipAddress)
  .then(hostnames => {
    if (hostnames.length > 0) {
      console.log(`Reverse DNS lookup for ${ipAddress}: ${hostnames.join(', ')}`);
    } else {
      console.log(`No PTR Record Found for ${ipAddress}`);
    }
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });