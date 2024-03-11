// Save options
function saveOptions() {
  var formatStyle = document.getElementById('formatStyle').value;
  chrome.storage.sync.set({ formatStyle }, function () {
    console.log('Options saved.');
    // Optional: Display a saved message or animate the button
  });
}

// Restore options
function restoreOptions() {
  chrome.storage.sync.get({ formatStyle: 'slack' }, function (items) {
    document.getElementById('formatStyle').value = items.formatStyle;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
