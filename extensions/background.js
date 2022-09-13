const openPopup = async (params) => {
  const urlSearchParam = new URLSearchParams(params).toString();
  chrome.windows.create({
    url: `./dist/receiveRequest.html?${urlSearchParam}`,
    type: "popup",
    focused: true,
  });
};
// embedからのメッセージを受け取り、popupに送信します

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "OPEN_TAB") {
    console.log("TEST_POPUP");
    openPopup(message.data);
  }
});
