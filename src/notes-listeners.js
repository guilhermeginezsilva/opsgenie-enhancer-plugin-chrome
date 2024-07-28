import { applyStylesBasedOnDarkModeOrLightMode } from './notes-compatibility.js';
import { updateButtonState, updateAddResultButtonState, updateVisibility } from './notes-rendering.js';

let setMonitorInterval = {
    id: null,
    startedAt: null
};

export function setupListeners(components) {
    // Listen for radio button changes
    components.noteTypeRadio.resultOption.input.addEventListener('change', (event) => updateVisibility(event, components));
    components.noteTypeRadio.noteOption.input.addEventListener('change', (event) => updateVisibility(event, components));

    // Save data from custom fields to the note input
    components.button.addResult.addEventListener('click', (event) => {
        console.log('Add note button clicked');
        if (components.noteTypeRadio.resultOption.input.checked) {

            const resultAsObject = {
                trigger: components.textArea.trigger.value,
                action: components.textArea.action.value,
                cause: components.textArea.cause.value
            };
            const formattedResult = `
            Trigger: ${components.textArea.trigger.value}\n
            Action: ${components.textArea.action.value}\n
            Cause: ${components.textArea.cause.value}\n
            ========JSON========\n
            ${JSON.stringify(resultAsObject)}
            ======JSON=END======\n
            `;

            components.opsgenie.noteInput.value = formattedResult;
            console.log('Note input value set to:', components.opsgenie.noteInput.value);

            // Trigger input event to update the note input
            const inputEvent = new Event('input', { bubbles: true });
            components.opsgenie.noteInput.dispatchEvent(inputEvent);

            // Setup the listener to check if the note input is cleared
            if(!setMonitorInterval.id) {
                setMonitorInterval.startedAt = new Date();
                setMonitorInterval.id = setInterval(() => {
                    const noteInput = components.opsgenie.noteInput;
                    
                    // timeout to clear the interval
                    if(!setMonitorInterval.id) {
                        return;
                    }

                    if (noteInput.value === '') {
                        clearInterval(setMonitorInterval.id);
                        setMonitorInterval.id = null;
                        setMonitorInterval.startedAt = null;
                        console.log('Input note has changed been cleared');
                        components.textArea.trigger.value = '';
                        components.textArea.action.value = '';
                        components.textArea.cause.value = '';
                        return;
                    }

                    if(new Date() - setMonitorInterval.startedAt > 10000) {
                        console.log('Input note has changed been cleared due to timeout');
                        clearInterval(setMonitorInterval.id);
                        setMonitorInterval.id = null;
                        setMonitorInterval.startedAt = null;
                    }
                }, 100);
            }

            // Click the real Add Note button
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });
            components.opsgenie.addNoteButton.dispatchEvent(clickEvent);
        }
    }, true);

    // Add note button event listener
    components.opsgenie.noteInput.addEventListener('input', (event) => {
        if(event.currentTarget.value === '') {
            updateButtonState(components.opsgenie.addNoteButton, event.currentTarget.value);
        } else {
            updateButtonState(components.opsgenie.addNoteButton, event.currentTarget.value);
        }
    }, true);

    // Custom fields input event listeners
    components.textArea.trigger.addEventListener('input', (event) => {
        updateAddResultButtonState(components);
    }, false);
    components.textArea.action.addEventListener('input', (event) => {
        updateAddResultButtonState(components);
    }, false);
    components.textArea.cause.addEventListener('input', (event) => {
        updateAddResultButtonState(components);
    }, false);

    // Apply styles based on dark mode or light mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyStylesBasedOnDarkModeOrLightMode);
}


