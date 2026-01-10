import React, { Component } from 'react'
import download from './image/download.png'



export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url, author, publishedAt, source } = this.props
        return (
            <div className='my-3'>
                <div className="card" >
                    <div style={{ display: "flex", justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger" > {source}</span>
                    </div>
                    <img src={imageUrl ? imageUrl : download} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        <small className="text-body-secondary">By {author ? author : 'Unknown'} on {new Date(publishedAt).toGMTString()}</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem