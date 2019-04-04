import { template as CupHTMLTemplate } from "file-templates/cup-to-html";

const fs = window.require("fs");
const { dialog, app } = window.require("electron").remote;

export const CUP = {
  saveJSON: content => {
    const options = {
      defaultPath: app.getPath("documents") + "/cup.cup"
    };
    try {
      const saveLocation = dialog.showSaveDialog(options);
      if (saveLocation) {
        fs.writeFileSync(
          `${saveLocation}.cup`,
          JSON.stringify(content),
          "utf-8"
        );
        return { saveLocation, error: null };
      } else {
        return { saveLocation: null, error: null };
      }
    } catch (e) {
      return { saveLocation: null, error: e };
    }
  },

  saveHTML: content => {
    const html = CupHTMLTemplate(content, {});
    const options = {
      defaultPath: app.getPath("documents") + "/cup.html"
    };
    try {
      const saveLocation = dialog.showSaveDialog(options);
      if (saveLocation) {
        fs.writeFileSync(saveLocation, html, "utf-8");
        return { saveLocation, error: null };
      } else {
        return { saveLocation: null, error: null };
      }
    } catch (e) {
      return { saveLocation: null, error: e };
    }
  }
};
