import React from 'react'
import Button from './Button'

interface UploadFormProps {
    handleFileChange: any,
    handleUploadClick: any
}

const UploadForm = ({ handleFileChange, handleUploadClick }: UploadFormProps) => {
    return (
        <div className='flex flex-col gap-6 items-center mt-5 bg-white p-5 rounded-lg'>
            <h2 className='font-bold'>File Upload</h2>
            <form className='flex flex-col items-center'>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*" // Optional: restrict file type (e.g., images only)
                    className='w-5/6'
                />
                {/* <button type="button" onClick={handleUploadClick}>
                Upload
              </button> */}
            </form>
            <Button text='อัพโหลด' handler={handleUploadClick} />
        </div>
    )
}

export default UploadForm