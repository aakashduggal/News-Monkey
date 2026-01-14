import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

// document.title = `${capitalized(category)} - NewsMonkey`

const News = (props) => {

    useEffect(() => {
        update()
    }, [])




    const capitalized = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const update = async () => {
        props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        setArticles(parsedData.articles || [])
        setTotalResults(parsedData.totalResults || 0)
        setLoading(false)
        props.setProgress(100)
    }

    // const handlePrevClick = async () => {

    //     setPage(page - 1)
    //     update()
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     update()
    // }

    const fetchMoreData = async () => {

        let nextpage = page + 1
        setPage(nextpage)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${nextpage}&pageSize=${props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()

        if (!parsedData.articles || parsedData.articles.length === 0) {
            // Stop the spinner if no articles are returned
            setLoading(false)
            setTotalResults(articles.length)
        } else {
            setArticles(articles.concat(parsedData.articles || []))
            setTotalResults(parsedData.totalResults || 0)
        }
    }

    return (
        <>
            <h2 className="text-center" style={{ margin: '25px 0px' }}>NewsMonkey-Top {capitalized(props.category)} Headlines</h2>

            {/* {state.loading && <Spinner />} */}

            <InfiniteScroll
                dataLength={articles ? articles.length : 0}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
                style={{ overflow: 'hidden' }}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className='col-sm-4' key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} url={element.url ? element.url : ""} author={element.author ? element.author : ""} publishedAt={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : ""} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className='container my-3 d-flex justify-content-between'>
                            <button type="button" disabled={page <= 1} onClick={handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                            <button type="button" disabled={(page >= Math.ceil(totalResults / pageSize))} onClick={handleNextClick} className="btn btn-dark">Next &rarr;</button>

                        </div> */}

        </>
    )
}


News.defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News