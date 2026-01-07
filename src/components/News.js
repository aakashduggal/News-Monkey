import React, {Component} from 'react'
import NewsItem from './NewsItem'

class News extends Component{
    render(){
        return(
            <>
            This is news Component 
            <br/>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>
            <NewsItem/>

            </>
        )
    }
}

export default News