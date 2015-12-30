import React, { Component, PropTypes } from 'react';
import { Link, State } from 'react-router';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = { booksList:[] };
  }

  mixins: [State]

  componentDidMount() {
    let ctype = this.props.params.typeId;
    let { keywords, url } = {};
    if(ctype) {
      switch (ctype) {
        case '1': keywords = '科技'; break;
        case '2': keywords = '文学'; break;
        case '3': keywords = '哲学'; break;
      }
      url = "https://api.douban.com/v2/book/search?q="+ keywords +"&fields=id,title,isbn10,image,author,pubdate,price,summary";
    } else {
      url = "http://127.0.0.1:3000/books";
    }
    console.log(url);
    jQuery.ajax({ url: url})
    .done((res) => {
      //console.log(data);
      this.setState({ booksList:res });
    })
    .fail((jqXhr) => {
      console.log('error ajax!');
    });
  };

  render() {
    let books = this.state.booksList;
    let categoryList = [];
    for( let key in books ) {
      let { title, isbn10, image, author, pubdate, price, summary } = books[key];
      categoryList.push(
        <div key={isbn10} className='list-group-item animated fadeIn'>
          <div className='media'>
            <div className='pull-left thumb-lg'>
              <Link to={'/view/' + isbn10}>
                <img className='media-object' src={ image }/>
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/view/' + isbn10}>{ title }</Link>
              </h4>
              <p><strong>作者:</strong> { author }</p>
              <p><strong>出版日期:</strong> { pubdate }</p>
              <p><strong>价格:</strong> { price }</p>
              <p><strong>介绍:</strong> { summary }</p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className='container'>
        <div className='list-group'>
          {categoryList}
        </div>
      </div>
    );
  }
}

export default Category