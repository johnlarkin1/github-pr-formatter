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

  console.log('style:', style);
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

document.addEventListener('click', function (event) {
  let target = event.target;
  while (target && !target.classList?.contains('js-issue-title')) {
    target = target.parentElement;
  }

  if (target && target.classList.contains('js-issue-title')) {
    chrome.storage.sync.get(['formatStyle', 'enabled'], function (items) {
      if (items.enabled) {
        applyStyleToTitle(target, items.formatStyle);
      }
    });
  }
});
