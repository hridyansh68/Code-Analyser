
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showAnalysis') {
      // Display the analysis result
      // You can use the createModal() function and code from my previous response
      console.log(request.analysis);
      createModal(request.analysis);
    }
  });



  function createModal(result) {
    let modal = document.getElementById('codeAnalysisModal');
    let modalContent = document.getElementById('codeAnalysisModalContent');
    let closeButton = document.getElementById('codeAnalysisModalCloseButton');
  
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'codeAnalysisModal';
      modal.style.display = 'none';
      modal.style.position = 'fixed';
      modal.style.zIndex = '10000';
      modal.style.left = '50%';
      modal.style.top = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.overflow = 'auto';
      modal.style.backgroundColor = 'rgba(0,0,0,0.6)';
      document.body.appendChild(modal);
  
      modalContent = document.createElement('div');
      modalContent.id = 'codeAnalysisModalContent';
      modalContent.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
      modalContent.style.padding = '30px';
      modalContent.style.borderRadius = '5px';
      modalContent.style.border = '1px solid #666';
      modalContent.style.width = '100%';
      modalContent.style.overflowY = 'scroll';
      modalContent.style.maxHeight = '70vh';
      modalContent.style.color = '#f0f0f0';
      modalContent.style.position = 'relative';
      modalContent.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
      modal.appendChild(modalContent);
  
      closeButton = document.createElement('span');
      closeButton.id = 'codeAnalysisModalCloseButton';
      closeButton.innerHTML = '&times;';
      closeButton.style.color = '#f56c6c';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.style.fontSize = '24px';
      closeButton.style.fontWeight = 'bold';
      closeButton.style.cursor = 'pointer';
      closeButton.onclick = function () {
        modal.style.display = 'none';
      };
      modalContent.appendChild(closeButton);
    }
  
    // Insert the result with its HTML formatting
    modalContent.innerHTML = '';
    modalContent.insertAdjacentHTML('beforeend', result);
    modalContent.prepend(closeButton); // Make sure the close button is always at the top
    modal.style.display = 'block';
  }
  
  
  
  
  
  
  
  
  
  
  
  
  