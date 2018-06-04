const wkhtmltopdf = require('wkhtmltopdf')
const fs = require("fs")

wkhtmltopdf.command = '~/Downloads/wkhtmltox/bin/wkhtmltopdf';

var data = {
	inputFile: "./inputs/file.html",
	outputFile: "./outputs/out.pdf",
	pageSize: 'A4'
}

fs.readFile(data.inputFile, convertToPDF)

function convertToPDF(err, html) {
	if (err) {
		return false
	}

	wkhtmltopdf(html, {
		pageSize: data.pageSize,
		'print-media-type': true,
		'margin-bottom': 0,
		'margin-top': 0,
		'margin-left': 0,
		'margin-right': 0,
		'zoom': 2,
	}).pipe(fs.createWriteStream(data.outputFile))
}

