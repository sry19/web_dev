import React from 'react';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';

import graphQLFetch from './graphQLFetch.js';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';


{/**parent */}
{/**you should be able to use double quotes in the title of a newly added issue without causing any errors. */}
export default class IssueList extends React.Component { 
    constructor() {
        super();
        this.state = { issues: [] };
        {/**to make this always refer to IssueList, otherwise, this.state would be undefined */}
        this.createIssue = this.createIssue.bind(this);
        this.closeIssue = this.closeIssue.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search ) {
            this.loadData();
        }
    }

    async loadData() {
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        const vars = {};
        if (params.get('status')) vars.status = params.get('status');

        const effortMin = parseInt(params.get('effortMin'), 10);
        if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
        const effortMax = parseInt(params.get('effortMax'), 10);
        if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

        const query = `query issueList(
            $status: StatusType
            $effortMin: Int
            $effortMax: Int
        ) {
          issueList (
              status: $status
              effortMin: $effortMin
              effortMax: $effortMax
          ) {
            id title status owner
            created effort due
          }
        }`;
    
        const data = await graphQLFetch(query,vars);
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

    async closeIssue(index) {
        const query = `mutation issueClose($id: Int!) {
            issueUpdate(id:$id, changes: { status: Closed }) {
                id title status owner effort
                created due description
            }
        }`;
        const { issues } = this.state;
        const data = await graphQLFetch(query, { id: issues[index].id });
        if (data) {
            this.setState((prevState) => {
                const newList = [...prevState.issues];
                newList[index] = data.issueUpdate;
                return { issues: newList };
            });
        } else {
            this.loadData();
        }
    }

    render() {
        const { issues } = this.state;
        const { match } = this.props;

        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={issues} closeIssue={this.closeIssue} />
                <hr />
                <IssueAdd createIssue={this.createIssue}/>
                <hr />
                {/** let’s use the path as matched in the parent component, using this.props.match.path. This is so that even if the parent path changes for any reason, the change is isolated to one place. */}
                <Route path={`${match.path}/:id`} component={IssueDetail} />
            </React.Fragment>
        );
    }
}