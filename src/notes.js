import { buildCustomFields } from './notes-components.js';
import { setupListeners } from './notes-listeners.js';
import { fixViewComponentsCompatibility, applyStylesBasedOnDarkModeOrLightMode } from './notes-compatibility.js';
import { updateVisibility, updateButtonState, updateAddResultButtonState } from './notes-rendering.js';
import { insertBefore, insertAfter } from './infra/dom-manipulator.js';

export function modifyNoteSidebar(noteInput) {
    console.log('Modifying note sidebar');
    const components = buildCustomFields(noteInput);
    addComponentsToDom(components);
    setupListeners(components);
    fixViewComponentsCompatibility()
    applyStylesBasedOnDarkModeOrLightMode(components);
    updateVisibility(null, components);
    updateButtonState(components.opsgenie.addNoteButton, false);
    updateAddResultButtonState(components);
}

function addComponentsToDom(components) {
    // Radio selection
    insertBefore(components.noteTypeRadio.container, components.opsgenie.noteInput);
    insertBefore(components.tooltip.radioContainer, components.noteTypeRadio.container);

    // Custom text areas
    insertBefore(components.textArea.trigger, components.opsgenie.noteInput);
    insertBefore(components.textArea.action, components.opsgenie.noteInput);
    insertBefore(components.textArea.cause, components.opsgenie.noteInput);

    // Add Result button
    insertAfter(components.button.addResult, components.opsgenie.addNoteButton);
}