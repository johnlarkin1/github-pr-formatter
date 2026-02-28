const formatSelection = (selectedNode) => {
  const selection = selectedNode.textContent.trim();
  const url = window.location.href;
  const newText = `*[${selection}](${url})*`;
  navigator.clipboard.writeText(newText);
};

const applyStyleToTitle = (titleElement, style) => {
  const selection = titleElement.textContent.trim();
  const url = window.location.href;
  let newText;

  switch (style) {
    case 'slack':
      formatSelection(titleElement);
      break;
    case 'word':
      newText = `<a href="${url}"><b>${selection}</b></a>`;
      break;
    case 'notion':
      newText = `**[${selection}](${url})**`;
      break;
    case 'bold':
      newText = `*${selection}*`;
      break;
    case 'italic':
      newText = `**${selection}**`;
      break;
    default:
      newText = selection;
      break;
  }

  if (newText) {
    navigator.clipboard.writeText(newText);
  }
};

// Find the PR/issue title element from a click target.
// Walks up the DOM looking for known GitHub title selectors.
const findTitleElement = (target) => {
  let node = target;
  while (node) {
    // New GitHub React UI: <span class="markdown-title"> inside <h1 data-component="PH_Title">
    if (node.classList?.contains('markdown-title')) {
      return node;
    }
    // Legacy GitHub UI
    if (node.classList?.contains('js-issue-title')) {
      return node;
    }
    // The <h1> wrapper itself (data-component="PH_Title")
    if (node.dataset?.component === 'PH_Title') {
      return node.querySelector('.markdown-title') || node;
    }
    node = node.parentElement;
  }
  return null;
};

document.addEventListener('click', function (event) {
  const titleElement = findTitleElement(event.target);

  if (titleElement) {
    chrome.storage.sync.get(['formatStyle', 'enabled'], function (items) {
      // Default to enabled if never set
      const enabled = items.enabled !== undefined ? items.enabled : true;
      if (enabled) {
        applyStyleToTitle(titleElement, items.formatStyle || 'slack');
      }
    });
  }
});
