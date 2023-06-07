
const KB = 4000;
const MB = KB * 1000

const btnGenerateFile = document.querySelector("#btn_generate")
const inputFileSize = document.querySelector("#filesize")
const inputFileName = document.querySelector("#filename")

function downloadBlob(blob, name) {
    if (
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
    ) return window.navigator.msSaveOrOpenBlob(blob);

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}


function generiteFile() {
    const fileSize = Number(inputFileSize.value)
    const fileName = inputFileName.value || "file"


    if (fileSize < 0.1 || isNaN(fileSize)) {
        alert("Too small, or incorrect size of file")
        return
    }


    console.log(fileName, fileSize)
    // const buffer = new ArrayBuffer(10 * size);
    // const view = new Int32Array(buffer);
}


btnGenerateFile.addEventListener("click", generiteFile)


// downloadBlob(new Blob(view, { type: "" }), '1.jpg');