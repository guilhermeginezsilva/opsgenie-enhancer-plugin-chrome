export function improveExistingNotesRendering(components) {
    const noteText = components.opsgenie.noteInput.value;
    const match = noteText.match(/Trigger: (.*)\nAction: (.*)\nCause: (.*)/);
    if (match) {
        components.textArea.trigger.value = match[1];
        components.textArea.action.value = match[2];
        components.textArea.cause.value = match[3];
        console.log('Existing note format matched:', match);
    }
}

export function updateVisibility(event, components) {
    if (components.noteTypeRadio.resultOption.input.checked) {
        changeNoteComponentVisibility(components, false);
        changeResultComponentVisibility(components, true);
    } else {
        changeNoteComponentVisibility(components, true);
        changeResultComponentVisibility(components, false);
    }
}

export function updateButtonState(component, enabled) {
    if(enabled) {
        component.disabled = false;
    } else {
        component.disabled = true;
    }
}

export function updateAddResultButtonState(components) {
    updateButtonState(
        components.button.addResult,
        components.textArea.trigger.value != "" && 
            components.textArea.action.value != "" && 
            components.textArea.cause.value != ""
    );
}

function changeNoteComponentVisibility(components, show) {
    if(show) {
        components.opsgenie.noteInput.style.display = 'block';
        components.opsgenie.addNoteButton.style.display = 'block';
    } else {
        components.opsgenie.noteInput.style.display = 'none';
        components.opsgenie.addNoteButton.style.display = 'none';
    }
}

function changeResultComponentVisibility(components, show) {
    if(show) {
        components.textArea.trigger.style.display = 'block';
        components.textArea.action.style.display = 'block';
        components.textArea.cause.style.display = 'block';
        components.button.addResult.style.display = 'block';
    } else {
        components.textArea.trigger.style.display = 'none';
        components.textArea.action.style.display = 'none';
        components.textArea.cause.style.display = 'none';
        components.button.addResult.style.display = 'none';
    }
}