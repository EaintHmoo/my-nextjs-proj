'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label,name})
{
    const imageInput = useRef();
    const [previewImage,setPreviewImage] = useState();

    const handlePickClick = function()
    {
        imageInput.current.click();
    }

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if(!file)
        {
            setPreviewImage(null)
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            setPreviewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }
    return (
    <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {
                    !previewImage && <p>No image uploaded</p>
                }
                {
                    previewImage && <Image src={previewImage} alt='image uploaded by user' fill/>
                }
            </div>
            <input 
            className={classes.input}
            name={name}
            id={name}
            ref={imageInput}
            accept='image/png,image/jpeg'
            onChange={handleImageChange}
            type="file" />
            <button 
            onClick={handlePickClick}
            className={classes.button} 
            type='button'>Pick an Image</button>
        </div>
    </div>);
}