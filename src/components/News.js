import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({
        //     articles:parsedData.articles,
        //     totalResults:parsedData.totalResults,
        //     loading: false
        // })
        this.update()
    }

    static defaultProps = {
        country: 'us',
        pageSize: 6,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalized = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalized(this.props.category)} - NewsMonkey`
    }

    async update() {
        this.props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults || 0,
            loading: false,
        })
        this.props.setProgress(100)
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading: true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({
        //     articles:parsedData.articles,
        //     page: this.state.page-1,
        //     loading:false
        // })
        this.setState({
            page: this.state.page - 1
        })
        this.update()
    }

    handleNextClick = async () => {
        //    if(!(this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
        //    this.setState({loading: true})
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     console.log(parsedData)
        //     this.setState({
        //         articles:parsedData.articles,
        //         page:this.state.page +1,
        //         loading:false
        //     })
        // }
        this.setState({
            page: this.state.page + 1
        })
        this.update()
    }

    fetchMoreData = async () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),
            async () => {
                const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d44a33970c9149078263b4ed2e8be883&page=${this.state.page}&pageSize=${this.props.pageSize}`
                let data = await fetch(url)
                let parsedData = await data.json()
                this.setState({
                    articles: this.state.articles.concat(parsedData.articles || []),
                    totalResults: parsedData.totalResults || 0,
                    loading: false
                });
            }
        );
    };

    render() {
        return (
            <>
                <h2 className="text-center" style={{ margin: '25px 0px' }}>NewsMonkey-Top {this.capitalized(this.props.category)} Headlines</h2>

                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={this.state.articles ? this.state.articles.length : 0}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className='col-sm-4' key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} url={element.url ? element.url : ""} author={element.author ? element.author : ""} publishedAt={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : ""} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className='container my-3 d-flex justify-content-between'>
                            <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                            <button type="button" disabled={(this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize))} onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>

                        </div> */}


            </>
        )
    }
}

export default News