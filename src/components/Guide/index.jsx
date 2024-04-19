import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./style.css";
const Guide = () => {

  const docs = [{ uri: require("../../assets/instructions.pdf") }];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} config={{
    pdfVerticalScrollByDefault: true
  }}/>;
};

export default Guide;
