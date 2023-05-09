chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'analyzeCodeMenuItem',
      title: 'Analyze code',
      contexts: ['selection']
    });
  });
  
  // Listen for context menu item click
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (tab) {
      chrome.storage.sync.get(['isEnabled'], (data) => {
        if (data.isEnabled && info.menuItemId === "analyzeCodeMenuItem") {
            console.log('Selected text:', info.selectionText);
            if (info.selectionText) {

              chrome.scripting.executeScript(
                {
                  target: { tabId: tab.id },
                  files: ["inject.js"]
                },
                () => {
                    analyzeCodeWithChatGPT(info.selectionText)
                    .then((analysis) => {
                      displayResult(analysis);
                    })
                    .catch((error) => {
                      console.error('Error analyzing code:', error);
                    });
                }
              );
            
                

            }
        }
      });
    } else {
      console.error('Tab is undefined');
    }
  });

  async function analyzeCodeWithChatGPT(code) {
    
    // Retrieve the API key and languages from storage
    const { apiKey, languages } = await new Promise((resolve) => {
      chrome.storage.sync.get(['apiKey', 'languages'], resolve);
    });

  
    // Make a request to the ChatGPT API
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,

      },
      body: JSON.stringify({
        prompt: `Act as code analyser for the following segment of code. The code might belong to follwing framework or language ${languages}.\n\n You need to provide the result in following sections in follwing manner. 

        Explanation : Explanation of the code and what it could be doing. Explain any annotations if used. Explain any library method that might be getting used. 
        What could be done better : Any suggestions for improvement and optimisation. Keep this brief and to the point. Suggest code changes here. 
        Reference docs : Links of references which can help in going deep for this piece of code.
        
        Make all these 3 as headings and bold. Wrap all the content with appropriate html tags such that headings have headings tag and links are wrapped with href. So that the response can be directly rendered in HTML body. Here is the code that needs to be analysed : \n\n${code} .`,
        max_tokens: 250,
        model: "text-davinci-003",
        n: 1,
        stop: null,
        temperature: 0.5
      })
    });
  
    const data = await response.json();
    console.log(data);
    return data.choices[0].text;
  }
  
  function displayResult(analysis) {
    console.log(analysis);
    // Send the analysis result to the injector script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'showAnalysis', analysis: analysis });
      });
  }



  
