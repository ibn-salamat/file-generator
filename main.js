
const KB = 4000;
const MB = KB * 1000

const btnGenerateFile = document.querySelector("#btn_generate")
const inputFileSize = document.querySelector("#filesize")
const inputFileName = document.querySelector("#filename")
const errorMessageBlock = document.querySelector("h3")
const readyFilesBlock = document.querySelector("#ready_files")

let myWorker = null

if (window.Worker) {
    myWorker = new Worker("worker.js");

    myWorker.onmessage = function ({ data }) {
        if (data.message === "success") {
            const { fileName, blob, fileSize } = data

            const fileData = window.URL.createObjectURL(blob);

            generatedFiles.push({
                id: Number(new Date()),
                fileSize,
                fileName,
                fileData
            })

            const fileSizeInMb = fileSize / MB

            btnGenerateFile.disabled = false;
            btnGenerateFile.innerText = "Generate a file";

            let content = '';

            for (file of generatedFiles) {
                content += `
                    <a href="${fileData}" download="${fileName}">
                        <span>${fileName}</span>
                        <span>(${fileSizeInMb}Mb)</span>
                    </a>
                `
            }

            readyFilesBlock.innerHTML = content
        }
    }
} else {
    btnGenerateFile.disabled = true
    inputFileSize.disabled = true
    inputFileName.disabled = true
    errorMessageBlock.style.display = "block"
    alert("Turn on webworker or your browser dont support webworker")
}

let generatedFiles = [];

function waiter(seconds) {
    return new Promise((res) => {
        setTimeout(() => {
            res()
        }, seconds * 1000)
    })
}

async function generiteFile() {
    if (!myWorker) return

    btnGenerateFile.disabled = true;
    btnGenerateFile.innerText = "Generating file";

    const fileSize = Number(inputFileSize.value) || 1
    const fileName = inputFileName.value || "file"

    if (fileSize < 0.1 || isNaN(fileSize)) {
        alert("Too small, or incorrect size of file")
        return
    }

    myWorker.postMessage({
        fileName,
        fileSize: fileSize * MB
    })
}

btnGenerateFile.addEventListener("click", generiteFile)