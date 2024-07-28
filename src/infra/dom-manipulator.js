export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function insertBefore(newNode, referenceNode) {
    referenceNode.parentElement.insertBefore(newNode, referenceNode);
}