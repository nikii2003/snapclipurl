import React, { useState } from 'react'
import IMGurl from "./../../client/src/copy-regular.svg"
import axios from 'axios'
import "./App.css"

function App() {
  const [url,setURL]=useState('')
  const [slug,setSlug]=useState('')
  const [shortUrl,setShortURL]=useState('')
  
const generateURL = async ()=>{
  const response = await axios.post('/link',{
    url,
    slug
  })
  setShortURL(response?.data?.data?.shortUrl)
}
const copyURL = ()=>{
  navigator.clipboard.writeText(shortUrl)
  alert("copied Url") 
}
  return (
    <div>
      <h1 className='heading-url'>SnapClipURL</h1>
      <div className='main-links-container'>
        <div className='container'>
        <div className='create-links-box'>
        <h1 className='heading-link text-center'>Link Generation</h1>
        <div className='input-container'>
        <input className='input-box' 
        placeholder='Enter URL'
        value={url}
        type='text'
        onChange={(e)=>{
       setURL(e.target.value)
        }}
        />
        <input  className='input-box' 
        placeholder='Slug(Optional)'
        value={slug}
        type='text'
        onChange={(e)=>{
       setSlug(e.target.value)
        }}/>

        <input  className='input-box short-url' 
        placeholder='Short URL'
        value={shortUrl}
        type='text'
        disabled
        onChange={(e)=>{
          setShortURL(e.target.value)
        }}/>
        
        <button className='btn-create-URL'type='button' onClick={generateURL}>
          Generate  URL
         
        </button>
        <img src={IMGurl} className='copy-image'onClick={copyURL}/>
        </div>
        </div>
        </div>
        <div>
         <h1>All Links </h1>
        </div>
      </div>
    </div>

   
  )
}

export default App