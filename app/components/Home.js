import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadIndex } from '../actions'
import Indexbook from './Indexbook'

function loadData(props) {
  props.loadIndex()
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  render() {
    let { recoms } = this.props.indexs;
    let newsList = [];
    for( let key in recoms) {
      let { author, title , image, isbn10, summary } = recoms[key];

      newsList.push(
        <Indexbook key={isbn10} author={author} name={title} imgsrc={image} descripe={summary}/>
      );
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-sm-6">
            <h2>新书速递</h2>
          </div>
        </div>
        <div className="row">
          {newsList}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  loadIndex: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { pagename } = state.router.params
  let indexs = state.indexs
  return {
    pagename,
    indexs
  }
}

export default connect(mapStateToProps, { loadIndex })(Home)