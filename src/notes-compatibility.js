export function fixViewComponentsCompatibility() {
    // Fixing titles and divs overlapping the custom fields
    document.querySelector('.side-contents.add-note-always').style.padding = 0;
    document.querySelector('.side-header.has-action').style.height = 'fit-content';
    document.querySelector('.side-header.has-action').style.position = 'relative';
    document.querySelector('.send-note.ops-form').style.height = 'fit-content';

    // Removing the enter to send note check box
    document.querySelector('.area-description .genie-checkbox').style.display = 'none';
    document.querySelector('.area-description .info').style.display = 'none';
    document.querySelector('.area-description .primary-grey.compact-button').style.position = 'relative';
}

export function applyStylesBasedOnDarkModeOrLightMode(components) {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const triggerInput = components.textArea.trigger;
    const actionInput = components.textArea.action;
    const causeInput = components.textArea.cause;

    if (darkMode) {
        triggerInput.classList.add('dark-mode');
        actionInput.classList.add('dark-mode');
        causeInput.classList.add('dark-mode');
    } else {
        triggerInput.classList.add('light-mode');
        actionInput.classList.add('light-mode');
        causeInput.classList.add('light-mode');
    }
}
