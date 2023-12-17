import React, { useEffect, useState } from 'react'
import IMGurl from "./../../client/src/copy-regular.svg"
import "./App.css"
import axios from 'axios';

function App() {
  const [url,setURL]=useState('')
  const [slug,setSlug]=useState('')
  const [shortUrl,setShortUrl]=useState('')
  const [links,setLinks]=useState([])
  
const generateLink = async ()=>{
  const response = await axios.post('/link',{
    url,
    slug
  })
  setShortUrl(response?.data?.data?.shortUrl)
}
const copyShortURL = ()=>{
  navigator.clipboard.writeText(shortUrl)
  alert("copied Url") 
}

const loadLinks = async () =>{
  const response = await axios.get('/api/links');
  setLinks(response?.data?.data);
}
useEffect (()=>{
  loadLinks();
},[])
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
          setShortUrl(e.target.value)
        }}/>
        
        <button className='btn-create-URL'type='button' onClick={generateLink}>
          Generate  URL
         
        </button>
        <img src={IMGurl} className='copy-image'onClick={copyShortURL}/>
        </div>
        </div>
        </div>
        <div className='all-links-container'>
         
         {
          links?.map((linkObj, index)=>{
          const {url,slug,clicks}=linkObj;
          
          return(
            <div className='all-links-url-container'>
              <p>URL : <a href={url} className='url'>{url}</a></p>
              <p> Short URL : {process.env.REACT_APP_BASE_SLUG}/{slug}</p>
              <p> clicks : {clicks}</p>
            </div>
          )
          })
         }
        </div>
      </div>
    </div>
  )
}
export default App