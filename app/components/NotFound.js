import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        Sorry, 大哥你摸错门了！！！
      </div>
    );
  }
}

export default NotFound;