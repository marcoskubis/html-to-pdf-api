const wkhtmltopdf = require('wkhtmltopdf')
const fs = require("fs")

wkhtmltopdf.command = process.env.WKHTMLTOPDF_COMMAND;

exports.convert = function (data, cb) {
	return loadFile(data.inputFile)
			.then(contents => {
				return makeConversion(contents, data.outputFile, data.pageSize, cb)
			}, err => {
				throw err.message;
			})
}


function loadFile(file) {
	return new Promise((resolve, reject) => {
			fs.readFile(file, (err, contents) => {
				if (err) {
					return reject(err)
				}
				resolve(contents);
			})
		})
}


function makeConversion(contents, outputFile, size, cb) {
	return new Promise((resolve, reject) => {
		wkhtmltopdf(contents, {
			'pageSize': size,
			'print-media-type': true,
			'margin-bottom': 0,
			'margin-top': 0,
			'margin-left': 0,
			'margin-right': 0,
			'zoom': 2,
		}, (err, stream) => {
			if (err) return reject(err);
			resolve(stream);
			cb(stream);
		});
	})
}