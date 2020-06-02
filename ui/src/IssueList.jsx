import React from 'react';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import graphQLFetch from './graphQLFetch.js';

{/**parent */}
{/**you should be able to use double quotes in the title of a newly added issue without causing any errors. */}
export default class IssueList extends React.Component { 
    constructor() {
        super();
        this.state = { issues: [] };
        {/**to make this always refer to IssueList, otherwise, this.state would be undefined */}
        this.createIssue = this.createIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
          issueList {
            id title status owner
            created effort due
          }
        }`;
    
        const data = await graphQLFetch(query);
        if (data) {
            this.setState({ issues: data.issueList });
        }
      }

    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
                id
            }
        }`;

        const data = await graphQLFetch(query, { issue });
        if (data) {
            this.loadData();
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues}/>
                <hr />
                <IssueAdd createIssue={this.createIssue}/>
            </React.Fragment>
        );
    }
}