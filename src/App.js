import React, { Component } from 'react';

import logo from './images/logo_blue.png';
import styled from "styled-components";


import SearchBar from "./components/Search.js"
import QuestionAnswer from "./components/QA.js"
import StepReader from "./components/Reader.js"


import {Grid, Tabs, Tab, Paper} from '@material-ui/core';

import { withRouter, Route, Switch, Link } from "react-router-dom";



import './App.css';

const TabContainer = styled(Paper)`
    width: 50%;
    text-align: center;
    min-height: 90vh;
    margin-bottom: 1em;  
`;

const SubText = styled.p`
    font-size: 0.8em;
    margin: 0 0 2em 0;
    
`;

const Logo = styled.img`
    margin-top: 2em;
`

class App extends Component {

    constructor(props) {
        super(props);
        this.pathName_index_map = ['qa','cases', 'acts'];
        // console.log(this.props.location.pathname.split("/")[1]);
        this.state = {
            value: this.pathName_index_map.indexOf(this.props.location.pathname.split("/")[1]),
        };
    };


    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <React.Fragment>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Question Answer" component={Link} to='/qa'/>
                    <Tab label="Case Reader" component={Link} to='/cases'/>
                    <Tab label="Act Reader" component={Link} to='/acts'/>
                </Tabs>
                <Grid>
                    <Grid item container alignItems="center" direction="column" className="logo-container">
                        <Logo src={logo} className="headerLogo"/>
                        <SubText>Beta Build</SubText>
                    </Grid>


                    <Grid item container alignItems="center" direction="column">
                        <Switch>
                            <Route path="/qa" component={QuestionAnswer} />
                            <Route path="/cases/:caseUUID?/:index?" render={({match})=>{
                                return(
                                    <StepReader type="case" match={match}></StepReader>
                                )
                            }} />
                            <Route path="/acts" render={(match)=>{
                                return(
                                    <TabContainer>
                                        Item Three
                                    </TabContainer>
                                )
                            }} />
                            {/* when none of the above match, <NoMatch> will be rendered */}

                            /*TODO: Create a 404 page*/
                            {/*<Route component={NoMatch} />*/}
                        </Switch>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}


export default withRouter(App);

