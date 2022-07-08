

export function onChange(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      // The file's text will be printed here
      console.log(event.target.result)
    };
  
    reader.readAsText(file);
  }