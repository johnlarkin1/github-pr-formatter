const formatSelection = () => {
  let selectedNode = window.getSelection().anchorNode;

  // Find the node so that the whole title is always selected
  while (selectedNode && !selectedNode.classList?.contains("js-issue-title")) {
    selectedNode = selectedNode.parentElement || selectedNode.parentNode;
  }

  if (selectedNode) {
    const selection = selectedNode.textContent.trim();
    const url = window.location.href;
    const newText = `*[${selection}](${url})*`;
    navigator.clipboard.writeText(newText);
  }
};

// Listen for explicit copy event
document.addEventListener("copy", (event) => {
  const selectedNode = window.getSelection().anchorNode;
  const parentElement = selectedNode.parentElement || selectedNode.parentNode;

  if (parentElement && parentElement.classList.contains("js-issue-title")) {
    formatSelection();
    event.preventDefault();
  }
});

// Listen for selection change event
document.addEventListener("selectionchange", () => {
  const selectedNode = window.getSelection().anchorNode;
  const parentElement = selectedNode.parentElement || selectedNode.parentNode;
  if (parentElement && parentElement.classList.contains("js-issue-title")) {
    formatSelection();
  }
});
