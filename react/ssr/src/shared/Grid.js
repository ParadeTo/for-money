import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testLog } from './utils';
import { fetchRepos } from './actions';
class Grid extends Component {
  constructor(props) {
    super(props);
    this.fetchRepos = this.fetchRepos.bind(this);
  }
  componentDidMount() {
    this.fetchRepos();
  }
  componentDidUpdate(prevProps, prevState) {
    const { match: currMatch } = this.props;
    const { match: prevMatch } = prevProps;
    if (currMatch.params.id !== prevMatch.params.id) {
      // this.fetchRepos(this.props.match.params.id);
      this.fetchRepos();
    }
  }
  fetchRepos() {
    let lang = this.getCurrLanguage();
    this.props.fetchRepoData(lang);
  }

  getCurrLanguage() {
    const { match } = this.props;
    return match.url === '/' ? 'all' : match.params.id || 'all';
  }
  render() {
    const { repoData = [], isFetching } = this.props;
    if (isFetching) {
      return <p>LOADING...</p>;
    }
    if (repoData.length === 0) {
      return <p>API data is not ready, please try again</p>;
    }

    return (
      <div>
        <h3>{this.getCurrLanguage()}</h3>
        <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
          {repoData.map(({ name, owner, stargazers_count, html_url }) => (
            <li
              key={name}
              style={{ margin: 25, color: 'black', fontSize: '20px' }}
            >
              <ul>
                <li>
                  <a href={html_url}>{name}</a>
                </li>
                <li>@{owner.login}</li>
                <li>{stargazers_count} stars</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { repos } = state;
  return {
    repoData: repos.data,
    isFetching: repos.isFetching,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchRepoData: language => dispatch(fetchRepos(language)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Grid);
