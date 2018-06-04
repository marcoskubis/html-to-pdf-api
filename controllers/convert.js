const HtmlPDF = require('../html-pdf')

module.exports = {
	index: (request, response) => {
		var data = {
			contents: request.body.contents,
			pageSize: request.body.pageSize,
			filename: request.body.filename,
		}
		HtmlPDF.convert(data, stream => {
			response.setHeader('Content-Type', 'application/pdf');
			response.setHeader('Content-Disposition', 'inline; filename=' + data.filename);
			stream.pipe(response);
		});
	}
}