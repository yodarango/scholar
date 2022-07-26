export function copyToClipboard(text: string, alertUser:()=> void) {
    // copy the text
    navigator.clipboard.writeText(text).then(() => {
        // Alert the user that the action took place.
        alertUser();
    });
}
