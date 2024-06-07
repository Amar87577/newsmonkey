import React, { Component } from 'react'
import NewsItem from './NewItem'
import PropTypes from 'prop-types'


export class News extends Component {
 defaultProps = {
    country: 'in',
    pageSize: 6,
    category:'general'
  }
  
 PropTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category: PropTypes.string
  }

  constructor(){
    super();
    this.state ={
        articles:[],
        loading: false,
        page: 1
    }
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d27d20ef845493a928148512ea9ba79&page=${this.props.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults})

  }

 async componentDidMount(){
  // this.updateNews();
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d27d20ef845493a928148512ea9ba79&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults})
  }
 
  




  handlePrevClick = async ()=>{
    // this.setState({ page: this.state.page - 1});
    // this.updateNews();

      if( this.state.page - 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

      }
      else{
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d27d20ef845493a928148512ea9ba79&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
          let data = await fetch(url);
          let parseData = await data.json()
          console.log(parseData);
          this.setState({
          page: this.state.page -1,
          articles: parseData.articles
      })
    }
  }





  handleNextClick = async ()=>{
    // this.setState({ page: this.state.page + 1});
    // this.updateNews();


    if( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d27d20ef845493a928148512ea9ba79&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
        page: this.state.page +1,
        articles: parseData.articles
    })
  }
  }




  render = () => {
  return (

        <div className="container my-5">
          <h1 className='text-center' style={{margin: '30px 0px'}}>NewsMonkey - Top Headlines</h1>
          <div className="row">
          {this.state.articles.map((element) => {
            if(element.urlToImage == null){
              element.urlToImage = 'https://intv-cms-images.s3.amazonaws.com/2022/08/breaking-news-1661393817.jpg';
            }
            return <div className="col-ex-12 col-sm-6 col md-4 col-lg-4 col-xl-4" key={element.url}>
                        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
            
            })}
             </div>
             <div className="container d-flex justify-content-between">
             <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
             <button disabled={this.state.page  + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) }  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
             </div>
        </div>

  )
}
}

export default News
