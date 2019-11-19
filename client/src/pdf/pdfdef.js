import localizeImage from './localizeImage';

const getDocDefinition = (templateData) => {
return {
    pageMargins: [ 40, 60, 40, 60 ],
    header: {
        columns: [
          { 
              image: localizeImage,
          fit:[100,100],
          alignment: 'right',
          margin:[10,10,10,10] }
        ]
      },
    content: [
        {text: 'Purchase Order', alignment:'center', style:'header', marginBottom:10},
        {
			style: 'tableExample',
			table: {
				body: [
					['Created Date', templateData['createdOn']],
					['PO Number', templateData['poNumber']]
				]
			}
        },
        {
			style: 'tableExample',
			table: {
				body: [
					['Partner Name', templateData.vendorName],
					['Email Id', templateData.vendorMailId]
				]
			}
        },
        {
			style: 'tableExample',
			table: {
				body: [
					['Project Manager', templateData.localizePM],
					['Project Name', templateData.projectName],
					['Nature of Work', templateData.workType],
					['Language', templateData.language],
					['Word Count', templateData.wordCount],
					['Project Cost', templateData.vendorCost],
					['Currency', templateData.currency]
				]
			}
        },
        {text:'Sincerely', style:'boldText', marginBottom:20},
        {text: 'Project Manager Name'},
        {text: templateData.localizePM, style:'boldText', pageBreak:'after'},
        
        {text: 'Terms & Conditions', style:'header', alignment:'center' }
        
    
    ],
    styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
        },
        boldText:{
            bold:true
        },
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
        },
        
	},
	defaultStyle: {
		// alignment: 'justify'
	}
	}
}
export default getDocDefinition;