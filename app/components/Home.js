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
    this.state = { indexList:[] };
  }

  componentWillMount() {
    loadData()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps)
    }
  }

  render() {
    let { recomms } = this.props;
    let newsList = [];
    for( let key in recomms) {
      let { author, title , image, isbn10, summary } = recomms[key];

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
  let indexList = state.indexList
  return {
    indexList
  }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ loadIndex }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)