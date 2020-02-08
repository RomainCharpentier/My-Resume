import React, { Component } from 'react';
import axios from 'axios';
import GitRepository from './GitRepository.js';
import { List } from '@material-ui/core';

export default class GitRepositoryList extends Component {

    constructor(props){
        super(props);
        this.state = {}
        this.performSearch.bind(this);
    }

    componentDidMount() {
        this.performSearch();
    }

    performSearch() {
        axios.get(`https://api.github.com/users/RomainCharpentier/repos`)
            .then(response => {
                this.setState({
                    repos: response.data
                });
                this.forceUpdate(); // call render()
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render() {
        const results = this.state.repos;
        let repos;
        if (results && results.length > 0) {
            results.sort(GitRepository.compare);
            repos = results.map(repo => <GitRepository key={repo.id} repo={repo} />);
        }
        return(
            <List >
                {repos}
            </List >
        );
    }
}