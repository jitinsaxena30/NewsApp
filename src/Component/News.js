import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalize(this.props.category)}- NewsMonkey`;
  }

  async updateNews() {

    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6e43e750ea94ec89baf966993d3a128&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);
    this.setState({
      loading: true,
    });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6e43e750ea94ec89baf966993d3a128&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //     loading:true
    // })
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page - 1,
    //     loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    // if(!(this.state.page + 1>Math.ceil((this.state.totalResults)/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6e43e750ea94ec89baf966993d3a128&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({
    //         loading:true
    //     })
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page + 1,
    //         loading:false
    //     })
    // }

    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e6e43e750ea94ec89baf966993d3a128&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

    this.setState({ page: this.state.page + 1 });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  };

  render() {
    return (
      <div>
        <div className=" my-4">
          <h1 className="text-center news-heading">
            NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
          </h1>
          {this.state.loading && <Spinner />}

          {/* Infinite Scrolling */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length <= this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title}
                        description={element.description}
                        imgUrl={element.urlToImage}
                        newsUrl={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container my-4 d-flex justify-content-center ">
            <button
              disabled={this.state.page <= 1}
              className="btn btn-dark mx-2"
              onClick={this.handlePrevClick}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-dark mx-2"
              onClick={this.handleNextClick}
            >
              {" "}
              Next &rarr;{" "}
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
