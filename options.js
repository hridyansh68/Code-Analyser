document.getElementById('optionsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const apiKey = document.getElementById('apiKey').value;
    const languages = document.getElementById('languages').value;
  
    chrome.storage.sync.set({ apiKey, languages }, () => {
      alert('Options saved successfully!');
    });
  });
  
  chrome.storage.sync.get(['apiKey', 'languages'], (data) => {
    document.getElementById('apiKey').value = data.apiKey || '';
    document.getElementById('languages').value = data.languages || '';
  });
  