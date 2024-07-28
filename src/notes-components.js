import { createRadioButton, createTextArea, createTooltip } from './infra/components-builders.js';

export function buildCustomFields(noteInput) {
    // Remove existing custom fields and radio buttons if they exist
    document.querySelectorAll('.custom-textarea, .custom-radio-container').forEach(element => element.remove());

    // Create the radio buttons
    const radioNoteTypeContainer = document.createElement('div');
    radioNoteTypeContainer.style.display = 'flex';
    radioNoteTypeContainer.style.alignItems = 'center';
    radioNoteTypeContainer.classList.add('custom-radio-container');
    const resultRadioType = createRadioButton('Result', 'mode', true);
    const noteRadioType = createRadioButton('Note', 'mode', false);
    radioNoteTypeContainer.appendChild(resultRadioType.container);
    radioNoteTypeContainer.appendChild(noteRadioType.container);

    // Radio buttons tooltip
    const radioNoteTypeContainerTooltip = createTooltip(
        `<b>Select the Note Type:</b></br></br>
        - <b>Result:</b> To add findings and conclusions after analysis</br>
        - <b>Note:</b> To log changes and events during a war room session or troubleshooting`,
        radioNoteTypeContainer
    );

    // Create the custom input text area
    const triggerInput = createTextArea('Trigger: What triggered the alert?');
    const actionInput = createTextArea('Action: What did you had to do?');
    const causeInput = createTextArea('Cause: What was the root cause?');

    // Create the fake Add Note Button copping the real one
    const addNoteButton = document.querySelector('.primary-grey.compact-button')
    const addResultButton = addNoteButton.cloneNode(true);
    Array.from(addResultButton.attributes).forEach(attr => {
        if (attr.name == 'class' || attr.name == 'style') {
            return;
        }
        addResultButton.removeAttribute(attr.name);
    });
    addResultButton.style.position = 'relative';
    addResultButton.querySelector('b').textContent = 'Add Result';

    const components = { 
        opsgenie: {
            noteInput: noteInput,
            addNoteButton: addNoteButton
        },
        noteTypeRadio: {
            container: radioNoteTypeContainer,
            noteOption: noteRadioType,
            resultOption: resultRadioType 
        },
        textArea: {
            trigger: triggerInput, 
            action: actionInput, 
            cause: causeInput
        },
        button: {
            addResult: addResultButton
        },
        tooltip: {
            radioContainer: radioNoteTypeContainerTooltip
        }
    };

    return components;
}
