onmessage = function (e) {
    this.setTimeout(() => {
        postMessage("success")
    }, 5000)
}