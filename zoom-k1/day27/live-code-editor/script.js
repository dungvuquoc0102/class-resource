const editorContainers = document.querySelectorAll(".editor-container");
let isDirty = false;

editorContainers.forEach((editorContainer) => {
  const editorCode = editorContainer.querySelector(".editor-code");
  const editorColumn = editorContainer.querySelector(".editor-column");
  const editorTextarea = editorContainer.querySelector(".editor-textarea");
  const editorPreview = editorContainer.querySelector(".editor-preview");

  let timeout;
  editorTextarea.addEventListener("input", () => {
    isDirty = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      editorPreview.srcdoc = editorTextarea.value;
    }, 500);
  });
});

window.addEventListener("beforeunload", (event) => {
  if (!isDirty) return;
  event.preventDefault();
});
