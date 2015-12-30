import React from 'react';

class Indexbook extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { author, name , imgsrc, isbn, descripe } = this.props;
    return (
      <div key={isbn} className='col-xs-3 col-sm-3 col-md-3'>
        <div className='thumbnail fadeInUp animated'>
          <img src={imgsrc}/>
          <div className='caption text-center'>
            <ul className='list-inline'>
              <li><strong>{name}</strong></li>
              <li><strong>作者：</strong>{author}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  };
}

export default Indexbook;