// Function to create text areas
export function createTextArea(placeholder) {
    const textarea = document.createElement('textarea');
    textarea.placeholder = placeholder;
    textarea.className = 'custom-textarea';
    textarea.style.display = 'block';
    textarea.style.width = '100%';
    textarea.style.boxSizing = 'border-box';
    return textarea;
}

// Function to create radio buttons
export function createRadioButton(labelText, name, checked) {
    const container = document.createElement('div');
    container.style.marginRight = '10px';
    container.classList.add('custom-radio-container');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.checked = checked;
    input.style.marginRight = '5px';

    const label = document.createElement('label');
    label.textContent = labelText;

    container.appendChild(input);
    container.appendChild(label);

    return { container, input };
}

export function createTooltip(text, target) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = text;
    tooltip.style.display = 'block';

    target.addEventListener('mouseover', () => {
        tooltip.classList.add('show');
    });
    target.addEventListener('mouseout', () => {
        tooltip.classList.remove('show');
    });

    return tooltip;
}