import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import Title from "../assets/Title";
import IconButton from "../assets/IconButton"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid2 } from "@mui/material";

const StyledHeader = styled(Grid2)`    
    width: 100%;
    height: 70px;
    float: left;
    background-color: #3a393e;
    border-top-right-radius: 9px;
`;

const Header = ({ currentDirectory, onPreviousClick, onNextClick, nextEnabled, previousEnabled }) => {
    return <StyledHeader container alignItems="center" direction="row" justifycontent="flex-start" >
        <Grid2 style={{ marginLeft: 8 }}>
            <IconButton onClick={previousEnabled ? onPreviousClick : () => {}} disabled={!previousEnabled}>
                <ArrowBackIosIcon />
            </IconButton>
        </Grid2>
        <Grid2 >
            <IconButton onClick={nextEnabled ? onNextClick : () => {}} disabled={!nextEnabled}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Grid2>
        <Grid2 style={{ textAlign: "left" }} size={6}>
            <Title>{currentDirectory}</Title>
        </Grid2>

    </StyledHeader>;
};

Header.propTypes = {
  currentDirectory: PropTypes.string,
  nextEnabled: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  previousEnabled: PropTypes.bool
};

export default Header;