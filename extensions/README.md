# Get Issuance/Presentation Request

```js
// This is issuer/verifier implementation

const clickHandler = async () => {
  window.postMessage(
    {
      type: "IDENTITY_WALLET",
      action: "OPEN_TAB",
      data: {
        redirectURL, // openid-vc://?request_uri=...
      },
    },
    "*"
  );
};
```
