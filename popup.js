const toggleSwitch = document.getElementById('toggleSwitch');

chrome.storage.sync.get('isEnabled', (data) => {
  toggleSwitch.checked = data.isEnabled;
});

toggleSwitch.addEventListener('change', () => {
  chrome.storage.sync.set({ isEnabled: toggleSwitch.checked });
});
