require('dotenv').config()
const express = require('express')
const HtmlPDF = require('./html-pdf')
const fs = require('fs');


const app = express()

app.get('/', (request, response) => {
	response.send("Hello world!")
})

app.get('/convert', (request, response) => {
	var data = {
		inputFile: "./inputs/file.html",
		pageSize: 'A4',
		filename: 'report.pdf',
	}
	HtmlPDF.convert(data, stream => {
		response.setHeader('Content-Type', 'application/pdf');
		response.setHeader('Content-Disposition', 'inline; filename=' + data.filename);
		stream.pipe(response);
	});
})


app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})


