import React , {Component} from "react";
import styled from "styled-components";

import PropTypes from 'prop-types';

import {Paper, InputBase} from "@material-ui/core";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const TextContainer = styled(Paper)`
    height: 3em;
    width: 90%;
    margin: 2em auto;
`;

const TextInput = styled(InputBase)`
    padding: 0 0.5em;
    height: 100%;
    width: 90%;
`;

const SearchButton = styled.button`
    background-color: transparent;
    padding: 0;
    border: 0;
    font-size: 1em;
    cursor: pointer;
`;


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    render() {
        let { placeholder, onFocus, onBlur, onChange, onEnterPress, searchHandler } = this.props;
        return (
            <TextContainer>
                <TextInput
                    placeholder={placeholder}
                    autoFocus={true} onFocus={onFocus}
                    onBlur={onBlur} onChange={(e)=>{
                        this.setState({query: e.target.value});
                        onChange(e);
                    }}
                    onKeyDown={onEnterPress}
                    value={this.state.query}
                />
                <SearchButton onClick={()=>{
                    searchHandler(this.state.query);
                }}>
                    <FontAwesomeIcon icon={faSearch} />
                </SearchButton>
            </TextContainer>
        );
    }
}

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired
};

export default (SearchBar);