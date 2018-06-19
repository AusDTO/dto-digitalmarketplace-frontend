To run this, first create an environment file with the following:

```
export FRONTEND_ADDRESS=[http://localhost:8000]
export SELLER_EMAIL=[some.seller@company.com]
export SELLER_PASSWORD=[password]
export BUYER_EMAIL=[some.buyer@government.gov.au]
export BUYER_PASSWORD=[password]
export TYPE_INPUT=[true|false]
```

next run `npm install`  
and start the tests with `source [PATH_TO_ENVIRONMENT_FILE] && npm test`