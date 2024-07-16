import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyTextEditor({ value, onChange }) {
  return (
    <Editor
      apiKey={
        process.env.REACT_APP_TINY_API_KEY ||
        process.env.NEXT_PUBLIC_TINY_API_KEY
      }
      init={{
        height: 500,
        plugins:
          "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (request, respondWith) =>
          respondWith.string(() =>
            Promise.reject("Failed to perform Operation")
          ),
      }}
      value={value}
      onEditorChange={(value) => onChange(value)}
    />
  );
}
