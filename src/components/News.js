import React, {Component} from 'react'
import NewsItem from './NewsItem'


export class News extends Component{
    
    async componentDidMount(){
        let url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d44a33970c9149078263b4ed2e8be883'
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles:parsedData.articles
        })
    }

    constructor(){
     super();
     console.log("Constructor is called in News")
      this.state={
         articles: [],
         loading: false
     }
    } 
    render(){
      
        return(
            <>
            <div className='container my-3'>
            <h2>News-Monkey For Your Daily News</h2>
            <div className='row'>

            {this.state.articles.map((element)=>{
             return <div className='col-md-4' key = {element.url}>
             <NewsItem title={element.title} dispcription={element.description} imageUrl={element.urlToImage} url={element.url}/>     
            </div>
            })}

            
            </div>
            </div>
            </>
        )
    }
}

export default News