import { modifyNoteSidebar } from './notes.js';

function isAlertDetailUrl() {
    const urlPattern = /^https:\/\/.*\.opsgenie\.com\/alert\/detail\/.*/;
    return urlPattern.test(window.location.href);
}

let lastUrl = window.location.href;

function observeUrlChanges() {
    const observer = new MutationObserver(() => {
        if (lastUrl !== window.location.href) {
            lastUrl = window.location.href;
            console.log('URL changed:', lastUrl);
            if (isAlertDetailUrl()) {
                const noteInput = document.querySelector('.ops-textarea');
                if (noteInput) {
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', onDocumentReady);
                    } else {
                        onDocumentReady();
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function onDocumentReady() {
    console.log('DOM fully loaded and parsed');
    const checkSidebar = setInterval(() => {
        const noteInput = document.querySelector('.ops-textarea');
        if (noteInput) {
            console.log('Note input field found:', noteInput);
            clearInterval(checkSidebar);
            if (isAlertDetailUrl()) {
                modifyNoteSidebar(noteInput);
                observeUrlChanges();
            }
        } else {
            console.log('Note input field not found, retrying...');
        }
    }, 1000);
}

chrome.storage.local.get(['enhancedOpsgenieAlertNotesPluginEnalbed'], function(result) {
    if(result.enhancedOpsgenieAlertNotesPluginEnalbed === false) {
        console.log('Plugin is disabled');
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onDocumentReady);
    } else {
        onDocumentReady();
    }
});
