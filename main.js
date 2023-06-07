
const KB = 4000;
const MB = KB * 1000

const btnGenerateFile = document.querySelector("#btn_generate")
const inputFileSize = document.querySelector("#filesize")
const inputFileName = document.querySelector("#filename")

let generatedFiles = [];

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

function waiter(seconds) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, seconds * 1000)
    })
}

async function generiteFile() {
    btnGenerateFile.disabled = true;
    btnGenerateFile.innerText = "Generating file";

    const fileSize = Number(inputFileSize.value) || 1
    const fileName = inputFileName.value || "file"


    if (fileSize < 0.1 || isNaN(fileSize)) {
        alert("Too small, or incorrect size of file")
        return
    }

    const buffer = new ArrayBuffer(fileSize * MB);
    const view = new Int32Array(buffer);
    const blob = new Blob(view, { type: "" });

    await waiter(3)

    console.log(blob)

    btnGenerateFile.disabled = false;
    btnGenerateFile.innerText = "Generate a file";
    // downloadBlob(, '1.jpg');
}


btnGenerateFile.addEventListener("click", generiteFile)