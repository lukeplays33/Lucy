let fileReader = new FileReader();

class downloadManager {
  constructor(name, content) {
    this.name = "UwU.jpg"; //name of the file to download

    this.file =
      "https://i.kym-cdn.com/photos/images/original/001/504/772/6f9.jpg";
    this.content;
  }

  downloadFile() {
    var link = document.createElement("a");
    link.download = this.name;
    link.href = this.file.includes("data:text")
      ? this.file
      : this.dataURLtoFile(fileReader.result, this.name);
    link.click();

    try {
      this.downloadFinished();
    } catch (e) {}
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return window.URL.createObjectURL(
      new File([u8arr], filename, { type: mime })
    );
  }

  startDownload() {
    // starts downloading a file
    if (
      this.file.includes("http://") ||
      this.file.includes("https://") ||
      this.file.substring(0, 1) == "."
    ) {
    } else {
      this.content = "data:text/plain;charset=utf-8," + this.file;
      this.downloadFile();
      return;
    }

    fileReader.onloadstart = () => {
      try {
        this.startedDownloading();
      } catch (e) {}
    };

    fetch(this.content)
      .then((response) => response.blob())
      .then((blob) => {
        fileReader.onabort = () => {
          try {
            this.downloadCancelled();
          } catch (e) {}
        };

        fileReader.onloadend = () => {
          this.downloadFile(fileReader.result);
        };

        fileReader.onprogress = (e) => {
          try {
            this.onProgress({
              total: e.total,
              downloaded: e.loaded,
              leftToDownload: e.total - e.loaded
            });
          } catch (e) {}
        };

        fileReader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error downloaing the file: ", error);
      });
  }

  cancelDownload() {
    fileReader.abort();
  }

  get content() {
    return this.file;
  }

  set content(value) {
    this.file = value;
  }
}
