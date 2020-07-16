import React, { Component } from 'react';
import styled from "styled-components";
// import fetch from '../helpers/fetchWithTimeout'

import SearchBar from "./Search.js"
import SearchResult from "./SearchResult"

import {CircularProgress, Paper} from '@material-ui/core';


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

class QuestionAnswer extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            status: "blank",
            currentQuery: "Init",
            currentResult: null,
        }
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
            this.setState({status:"loading", currentQuery: query});
            setTimeout(() => {
                let resData = {
                    answers: [
                        {
                            sentence: "Lorem Ipsum dolor Sit Amet.",
                            context: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque " +
                                "laudantium, totam rem aperiam, ea ipsa quae ab illo inventor veritatis et quasi architecto " +
                                "beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur " +
                                "aut odit aut fugit, sed quia consequuntur magni pains eos qui ratione voluptatem sequi " +
                                "nesciunt Neque porro quisquam est",
                            probability: 0.98
                        },
                        {
                            sentence: "3 Lorem Ipsum dolor Sit Amet.",
                            context: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque " +
                                "laudantium, totam rem aperiam, ea ipsa quae ab illo inventor veritatis et quasi architecto " +
                                "beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur " +
                                "aut odit aut fugit, sed quia consequuntur magni pains eos qui ratione voluptatem sequi " +
                                "nesciunt Neque porro quisquam est",
                            probability: 0.98
                        },
                        {
                            sentence: "2 Lorem Ipsum dolor Sit Amet.",
                            context: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque " +
                                "laudantium, totam rem aperiam, ea ipsa quae ab illo inventor veritatis et quasi architecto " +
                                "beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur " +
                                "aut odit aut fugit, sed quia consequuntur magni pains eos qui ratione voluptatem sequi " +
                                "nesciunt Neque porro quisquam est",
                            probability: 0.94
                        }
                    ]
                };
                this.setState({status:"result", currentResult: resData});
            },2000);
            fetch(`http://104.197.5.107:8000/search?query=${query}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({status:"result", currentResult: result});
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    () => {
                        this.setState({status:"error", currentResult: {}, currentQuery:{}});
                    }
                )
        }
    }



    render() {
        let { status, currentQuery, currentResult } = this.state;
        return (
            <TabContainer>
                <SearchBar
                    placeholder="Ask me a question" onFocus={this.handleTyping}
                    onBlur={this.handleBlur} onChange={this.handleTyping}
                    onEnterPress={this.handleEnterPress}
                    searchHandler={this.performSearch}
                />

                {status === "blank" &&
                    <p>Type a question in the search bar above to get started!</p>
                }

                {status === "typing" &&
                    <p>Press &lt;Enter&gt; to search.</p>
                }

                {status === "loading" &&
                    <VerticalCenterDiv>
                        <CircularProgress size={60} />
                        <p>Please wait while we fetch the best answer...</p>
                    </VerticalCenterDiv>
                }

                {status === "result" &&
                    <SearchResult resultData={currentResult} question={currentQuery}/>
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

export default (QuestionAnswer);