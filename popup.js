function saveSettings() {
  const formatStyle = document.getElementById('formatStyle').value;
  const enabled = document.getElementById('enableDisable').checked;

  chrome.storage.sync.set({ formatStyle, enabled }, function () {});
}

document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('save');
  const formatStyleSelect = document.getElementById('formatStyle');
  const enableDisableCheckbox = document.getElementById('enableDisable');

  // Load saved settings and update the UI, initializing defaults if never set
  chrome.storage.sync.get(['formatStyle', 'enabled'], function (data) {
    const formatStyle = data.formatStyle || 'slack';
    const enabled = data.enabled !== undefined ? data.enabled : true;
    formatStyleSelect.value = formatStyle;
    enableDisableCheckbox.checked = enabled;

    // Persist defaults on first load so content script can read them
    if (data.formatStyle === undefined || data.enabled === undefined) {
      chrome.storage.sync.set({ formatStyle, enabled });
    }
  });

  // Save settings immediately
  formatStyleSelect.addEventListener('change', saveSettings);
  enableDisableCheckbox.addEventListener('change', saveSettings);

  var checkbox = document.getElementById('enableDisable');
  checkbox.addEventListener('change', updateTextColors);

  var enableText = document.querySelector('.slider-text.on');
  var disableText = document.querySelector('.slider-text.off');

  function updateTextColors() {
    if (checkbox.checked) {
      enableText.style.color = '#2196f3';
      disableText.style.color = '#ccc';
    } else {
      enableText.style.color = '#fff';
      disableText.style.color = '#2196f3';
    }
  }

  updateTextColors();
});
