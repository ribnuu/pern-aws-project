// import React, { useEffect, useState } from 'react'
// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
// import { Document, Page } from 'react-pdf'
// import samplePDF from './1686548357219-57347379.pdf'

// const PDFViewer = () => {

//     const [numPages, setNumPages] = useState(null);
//       const [pageNumber, setPageNumber] = useState(1);

//     function onDocumentLoadSuccess({ numPages }) {
//         setNumPages(numPages);
//     }

//     const docs = [
//         {
//             uri : "http://localhost:4000/images/1686548357219-57347379.pdf"
//         },
//         // {
//         //     uri : "C:\Users\User\Desktop\Server\images\x0e1686548357219-57347379.pdf"
//         // },
//         {
//             uri : "http://localhost:4000/images/1686544871550-546800048.jpg"
//         },
//         {
//             uri : "http://localhost:4000/images/1686545524750-448451800.jpg"
//         },
//         {
//             uri : "http://localhost:4000/images/1686550849947-557068546.docx"
//         },
//         {
//             uri : "http://localhost:4000/images/1686551925421-329839448.csv"

//         },
//         // {
//         //     uri : (require('../../../../Server/images/1686550849947-557068546.docx'))
//         // },
//         // {
//         //     uri : (require('../../../../Server/images/1686545524750-448451800.jpg'))
//         // }

//     ]

//     return (
//     <section className='mx-12 my-12'>
//         {/* <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} className='bg-white' /> */}

//         <Document file={samplePDF} >
//             <Page pageNumber={pageNumber} />
//         </Document>
//     </section>
//   )
// }

// export default PDFViewer
