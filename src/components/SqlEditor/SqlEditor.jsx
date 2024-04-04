// SqlEditor.js
import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/ext-language_tools";

function SqlEditor({ setValue, value }) {
  return (
    <div className="editor-container">
      <AceEditor
        mode="mysql"
        theme="monokai"
        name="editor"
        width="100%"
        fontSize={20}
        minLines={15}
        readOnly={false} // Ensure it's not read-only
        maxLines={10}
        showPrintMargin={false}
        showGutter
        placeholder="Write your query here..."
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
        value={value}
        onChange={(value) => {
          console.log(value);
          setValue(value)}}
        showLineNumbers
      />
    </div>
  );
}

export default SqlEditor;
