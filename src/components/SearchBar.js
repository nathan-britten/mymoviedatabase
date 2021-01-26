import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

import history from '../history';
import { connect } from 'react-redux';
import { fetchSearchResults, fetchMovie } from '../actions';



const initialState = { isLoading: false, results: [], value: '' }

class SearchBar extends Component {
  state = initialState

  constructor(props) {
    super(props)
    this.getMovieResults = _.debounce(this.getMovieResults, 500)
  }
  
  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    this.props.fetchMovie(result.id, result.title)
    history.push(`/movies/single/${result.id}`)
  } 

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    this.getMovieResults(value);
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      this.setState({
        isLoading: false,
        results: this.props.searchresults,
      })
    }, 1000)
  }

 getMovieResults(value) {
    this.props.fetchSearchResults(value)
 }
 
  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid centered className='searchbar'>
        <Grid.Column width={12}>
          <Search
            fluid
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchresults: Object.values(state.search.results)
  }
}

export default connect(mapStateToProps, { fetchSearchResults, fetchMovie })(SearchBar);