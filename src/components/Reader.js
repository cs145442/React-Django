import React, { Component } from 'react';
import styled from "styled-components";

import PropTypes from 'prop-types';

import SearchBar from "./Search.js"

import {Paper, List, ListItem} from '@material-ui/core';

import { Link } from "react-router-dom";


const TabContainer = styled(Paper)`
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: center;
    min-height: 65vh;
    margin-bottom: 1em;  
`;

const VerticalCenterDiv = styled.div`
    margin-top: auto;
    margin-bottom: auto;  
`;

const ResultList = styled(List)`
    width: 90%;
    margin: 0 auto !important;
`;

const CaseText = styled.div`
    width: 90%;
    margin: 0 auto !important;  
`

class StepReader extends Component
{
    constructor(props) {
        super(props);
        let { match } = this.props;
        let status = '';
        if(!match.params.caseUUID)
            status = "blank"
        else
            status = "reading"

        this.state = {
            status: status,
            currentResult: null,
            currentCaseUUID: match.params.caseUUID
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let { match } = this.props;
        if(!match.params.caseUUID && this.state.status==="reading")
            this.setState( {
                status: "blank",
                currentResult: null,
                currentCaseUUID: null
            })
        if(match.params.caseUUID && this.state.status!=="reading")
            this.setState({
                status: "reading",
                currentResult: null,
                currentCaseUUID: match.params.caseUUID
            })
    }

    handleTyping = (e) => {
        if(this.state.status === "blank" && e.target.value!=="")
            this.setState({status:"typing"});
    };

    handleBlur = () => {
        let { status } = this.state;
        if(status === "typing")
            this.setState({status:"blank"})
    };

    handleEnterPress = e => {
        if(e.keyCode === 13) {
            e.preventDefault();
            this.performSearch(e.target.value);
        }
    };

    performSearch = (query) => {
        if(query !== "") {
            let resData = {
                searchTerm: this.state.currentQuery,
                results: [
                    {
                        name: "Case 1",
                        date: "12 Dec 2004",
                        uuid: "abcde12345"
                    },
                    {
                        name: "Case 2",
                        date: "12 Dec 2004",
                        uuid: "abcde12335"
                    },
                    {
                        name: "Case 3",
                        date: "12 Dec 2004",
                        uuid: "abcde12355"
                    }
                ]
            };
            this.setState({status:"result", currentResult: resData});
        }
    }



    render() {
        let { status, currentResult, currentCaseUUID } = this.state;
        console.log(status)
        return (
            <TabContainer>
                <SearchBar
                    placeholder="Search for a case by name or number" onFocus={this.handleTyping}
                    onBlur={this.handleBlur} onChange={this.handleTyping}
                    onEnterPress={this.handleEnterPress}
                    searchHandler={this.performSearch}
                />

                {status === "blank" &&
                <p>Search for a case above.</p>
                }

                {status === "typing" &&
                <p>Press &lt;Enter&gt; to search.</p>
                }

                {status === "result" &&
                    <ResultList>
                        {
                            currentResult.results.map((result) => {
                                return (
                                    <ListItem key={result.uuid} component={Link} to={`/cases/${result.uuid}`}>{result.name}</ListItem>
                                )
                            })
                        }
                    </ResultList>
                }

                {status === "reading" &&
                    <CaseText>
                        <h3>{currentCaseUUID}</h3>
                        <p>
                            At vero eos et accusamus et iusto hate dignissimos ducimus qui blanditiis praesentium
                            oluptatum deleniti atque corrupti quos pains et quas discomforts excepturi sint occaecati
                            cupiditate non provident, similique sunt in fault qui officia deserunt mollitia animi, id
                            estumumum dolorum et painum fuga Et harum quidem rerum facilis est et expedita distinctio Nam
                            libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                            maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus Temporibus
                            autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
                            repudiandae sint et inconveniae non recusandae Itaque earum rerum hic tenetur a sapiente
                            delectus, ut autreiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                        </p>
                    </CaseText>
                }

                {status === "error" &&
                <VerticalCenterDiv>
                    <p>An error occurred. Please reload the page and retry.</p>
                </VerticalCenterDiv>
                }

            </TabContainer>
        );
    }
}

StepReader.propTypes = {
    type: PropTypes.string.isRequired
};

export default (StepReader);