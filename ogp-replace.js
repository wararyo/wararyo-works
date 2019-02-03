if(process.argv.length < 6) {
	console.log("Usage: node "+process.argv[1]+" [file_in] [replace_from] [replace_file] [file_out]");
	return 0;
}

var fs = require('fs');
var fileInPath = process.argv[2];
var replaceFrom = process.argv[3];
var replaceTo = fs.readFileSync(process.argv[4], 'utf-8');
var fileOutPath = process.argv[5];
fs.readFile(fileInPath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(replaceFrom, replaceTo);

  fs.writeFile(fileOutPath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
  fs.unlinkSync(fileInPath);
});