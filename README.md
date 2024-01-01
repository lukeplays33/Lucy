# What is Lucy?

Lucy is a library to aims at simple and clear day to day operations in Javascript and aims at helping people to migrate from block building IDE's to actuall programming, this is why the functions may look simulair to block based IDE's.

# Example

For example downloading a file with Javascript requires you to create a function, make a parameter for the MIME type and the contents, in the function you need to create a whole new HTML A Element, give it a download attribute  and then click it.

Lucy changes this to just 4 lines of code! Saves you time and speeds up productivity!

So this:
``` javascript
function log(message) {
  return function () {
    alert(message);
  };
}

function download(file, callback) {
  var request = new XMLHttpRequest();
  request.responseType = 'blob';
  request.open('GET', file);
  request.addEventListener('load', log('load ' + file));
  request.addEventListener('error', log('error ' + file));
  request.addEventListener('progress', log('progress ' + file));
  request.addEventListener('load', function () {
    callback(request.response);
  });
  request.send();
}

function save(object, mime, name) {
  var a = document.createElement('a');
  var url = URL.createObjectURL(object);
  a.href = url;
  a.download = name;
  a.click();
}

document.querySelector('#download').addEventListener('click', function () {
  download('test.pdf', function (file) {
    save(file, 'application/pdf', 'test.pdf');
  });
});
```

Changes into this:

``` javascript
let downloadManager = new downloadManager();
downloadManager.file = 'https://th.bing.com/th/id/OIP.PuwQXn2azvbG10DFZO1f4AHaFP?rs=1&pid=ImgDetMain';
downloadManager.mimeType = 'jpg';
downloadManager.download();
```

See? far simpler and clearer.
With just 1 download you turned 31 lines of code into 4 lines of code.

# Docs

Our Documentation can be found at: https://lukehoogenboom.gitbook.io/lucy/

# Freemium

Lucy is a freemium project wich means that some component may require a monthly subscription to gain acces.

# Freemium Perks
