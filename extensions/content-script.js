window.addEventListener(
  "message",
  async (event) => {
    if (event.source != window) {
      return;
    }
    if (event.data.type && event.data.type === "IDENTITY_WALLET") {
      console.log("receive data type: IDENTITY_WALLET");
      switch (event.data.action) {
        case "OPEN_TAB":
          await chrome.runtime.sendMessage({
            action: event.data.action,
            data: event.data.data,
          });
          console.log("OPEN_TAB");
          console.log(event.data.data);
          break;
      }
    }
  },
  false
);
