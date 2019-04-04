const { dialog, app } = window.require("electron").remote;

export const confirm = text => {
  const dialogOptions = {
    type: "info",
    buttons: ["OK", "Cancel"],
    message: text
  };
  return dialog.showMessageBox(dialogOptions);
};
