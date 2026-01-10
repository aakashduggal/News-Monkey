import React, { Component } from 'react'
import download from './image/download.png'
import './NewsItem.css';


export class NewsItem extends Component {
    render() {
        let {title, despcription, imageUrl, url, author, publishedAt, source} = this.props
        return (
            <>
                <div className="card" >
                    <img src={imageUrl?imageUrl:download} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{despcription}</p>
                        <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                         <small class="text-body-secondary">By {author? author: 'Unknown'} on {new Date(publishedAt).toGMTString()}</small>
                           <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}}> {source}</span>
                    </div>
                </div> 
            </>
        )
    }
}

export default NewsItem