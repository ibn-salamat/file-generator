onmessage = function ({ data }) {
    const { fileName, fileSize } = data

    const buffer = new ArrayBuffer(fileSize);
    const view = new Int32Array(buffer);
    const blob = new Blob(view, { type: "" });

    postMessage({
        message: "success",
        blob,
        fileName,
        fileSize
    })

}