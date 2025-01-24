import React from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const PDFTemplate = () => {
  return (
    <div>
      <Page1 title="Page 1 Title" description="This is the content of Page 1" />
      <Page2 header="Page 2 Header" content="This is the content of Page 2" />
      <Page3 header="Page 3 Header" content="This is the content of Page 3" />
      <Page4 header="Page 4 Header" content="This is the content of Page 4" />
      {/* Add more pages here */}
    </div>
  );
};

export default PDFTemplate;
