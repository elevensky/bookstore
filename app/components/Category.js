import React, { Component, PropTypes } from 'react';
import { Link, State } from 'react-router';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = { booksList:[] };
  }

  mixins: [State]

  componentDidMount() {

    let ctype = this.props.params.ctype ? this.props.params.ctype : '';
    //alert(ctype);
    let url;

    url = "http://127.0.0.1:3000/books/"+ ctype;

    jQuery.ajax({ url: url})
    .done((res) => {
      //console.log(data);
      this.setState({ booksList:res });
    })
    .fail((jqXhr) => {
      console.log('error ajax!');
    });
  };
  //这个比较重要，判断同一个组件不同state是否需要更新
  componentDidUpdate(prevProps) {
    if (prevProps.params.ctype !== this.props.params.ctype) {
      let ctype = this.props.params.ctype ? this.props.params.ctype : '';
      let url = "http://127.0.0.1:3000/books/"+ ctype;

      jQuery.ajax({ url: url})
      .done((res) => {
        //console.log(data);
        this.setState({ booksList:res });
      })
      .fail((jqXhr) => {
        console.log('error ajax!');
      });
    }
  }

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