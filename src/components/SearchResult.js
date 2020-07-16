import React , {Component} from "react";
import styled from "styled-components";

import PropTypes from 'prop-types';

import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

// import "../helpers/sentenceCase"

const DescriptionTag = styled.p`
    text-align: left;
    margin: 0 auto;
    width: 86%;
`;

const ResultContainer = styled(ExpansionPanel)`
    padding: 1em;
    text-align: left;
    width: 86%;
    align-self: center;
    margin: 1em auto;
    
`;

// const LeftOrangeBorder = styled(ExpansionPanelSummary)`
//     border-left: 3px solid orange;
//     padding: 0 1em;
//     margin: 1em 0;
// `;

const LeftRedBorder = styled.div`
    border-left: 3px solid red;
    padding: 0 1em;
    margin: 1em 0;
`;

const LeftGreenBorder = styled.div`
    border-left: 3px solid green;
    padding: 0 1em;
    margin: 1em 0;
`;

const CaseList = styled.ul`
    list-style: none;
    text-align: left;
    width: 90%;
    margin: 0 auto;
    padding: 0;
`;

const RelatedDropdown = styled(ExpansionPanel)`
    box-shadow: none !important;
    margin-top: 1em;
`;

const  LeftOrangeBorder = withStyles({
    root: {

    },
    content: {
        borderLeft: "3px solid orange",
        padding: "0 1em;"
    }
})(props => <ExpansionPanelSummary {...props} />);

LeftOrangeBorder.muiName = 'ExpansionPanelSummary'

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = { answerExpanded: null }
    };

    handleChange = panel => (event, isExpanded) => {
        this.setState({
            answerExpanded: isExpanded ? panel : false
        })
    };

    render() {
        let { resultData, question } = this.props;
        return (
            <React.Fragment>
                <DescriptionTag><b>Question: {question}</b></DescriptionTag>

                {
                    resultData.answers.slice(0,10).map((element, ndx) => {
                        return (
                                    <ResultContainer
                                        key={`result${ndx+1}`}
                                        onChange={this.handleChange(`result${ndx+1}`)}
                                        expanded = {this.state.answerExpanded == `result${ndx+1}`}
                                    >
                                        <LeftOrangeBorder>
                                            <b>Answer: </b>{element.sentence}
                                        </LeftOrangeBorder>

                                        <ExpansionPanelDetails>
                                            <LeftGreenBorder>
                                                <b>Context: </b>{element.context}
                                            </LeftGreenBorder>
                                        </ExpansionPanelDetails>
                                    </ResultContainer>
                        );
                    })
                }


            </React.Fragment>
        );
    }
}

SearchResult.propTypes = {
    resultData: PropTypes.object.isRequired
};

export default (SearchResult);