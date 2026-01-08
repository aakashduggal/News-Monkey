import React, {Component} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export class News extends Component{
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading: false
        })
    }

    constructor(){
     super();
     console.log("Constructor is called in News")
      this.state={
         articles: [],
         loading: false,
         page:1,
        
     }
    } 

    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles:parsedData.articles,
            page: this.state.page-1,
            loading:false
        })
    }  
    
    handleNextClick = async ()=>{
       if(!(this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
       this.setState({loading: true})
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles:parsedData.articles,
            page:this.state.page +1,
            loading:false
        })
    }
    } 

    render(){
      
        return(
            <>
            <div className='container my-3'>
            <h2 className="text-center">News-Monkey For Your Daily News</h2>

            {this.state.loading && <Spinner/>}

            <div className='row'>

            {!this.state.loading && this.state.articles.map((element)=>{
             return <div className='col-md-4' key = {element.url}>
             <NewsItem title={element.title} dispcription={element.description} imageUrl={element.urlToImage} url={element.url}/>     
            </div>
            })}
            
            <div className='container my-3 d-flex justify-content-between'>
                <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClick} class="btn btn-dark">&larr; Previous</button>
                <button type="button" disabled={(this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize))} onClick={this.handleNextClick} class="btn btn-dark">Next &rarr;</button>

            </div>
            </div>
            </div>
            </>
        )
    }
}

export default News