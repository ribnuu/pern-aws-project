import axios from 'axios';
import React, { useEffect, useState } from 'react'


const FileSubmission = () => {

    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');
    const [renderedData , setRenderedData] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch('http://localhost:4000/image', {
          method: 'POST',
          body: formData,
        })
        if (response) setStatus(response.statusText)
      }
    
      const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
      }

      const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/viewImages');
        console.log(response.data)
        setRenderedData(response.data)
      }
    
      useEffect(() => {
        fetchData();
        } , [])
  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Submit a file</h2>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                    <input type="file" name="file" id="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Station Name" required="" onChange={handleFileChange} />
                </div>
                {status && <h4>{status}</h4>}
            </div>
            {image.preview && <img src={image.preview} width='250' height='250' />}
            <div className='mx-auto justify-center'>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-600    rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mx-auto">
                    Submit
                </button>
            </div>
        </form>
    </div>
    <div>
        {
            renderedData.map((data , key) => {
                  return (
                     <img key={key}  src={`http://localhost:4000/images/${data.filename}`} />
                  )
            })
        }

    </div>
</section>
  )
}

export default FileSubmission
