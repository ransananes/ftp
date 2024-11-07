import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import Title from "../assets/Title";
import IconButton from "../assets/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileUpload from "./FileUpload";
import { Grid2, Button } from "@mui/material";

const StyledHeader = styled(Grid2)`
  width: 100%;
  height: 70px;
  background-color: #3a393e;
  border-top-right-radius: 9px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledIconButton = styled(IconButton)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  &:hover {
    color: #3c8dbc;
    transform: scale(1.1);
    transition: color 0.3s, transform 0.3s;
  }
`;

const StyledButton = styled(Button)`
  color: white;
  border: 1px solid white !important;
  background-color: transparent !important;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 0px 4px 15px rgba(60, 141, 188, 0.4);
  }
`;

const StyledRefreshButton = styled(IconButton)`
  background-color: #f0f0f0;
  border-radius: 50%;
  padding: 10px;
  border: 2px solid red !important; 
  &:hover {
    background-color: transparent !important;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinningIcon = styled(RefreshIcon)`\
  &:hover {
    animation: ${spin} 1s linear infinite;
  }
`;

const Header = ({
  currentDirectory,
  onPreviousClick,
  onNextClick,
  nextEnabled,
  previousEnabled,
  onNewFolderClick,
  onFileUpload,
  onRefreshClick
}) => {
  return (
    <StyledHeader container alignItems="center" direction="row">
      <NavigationContainer>
        <StyledIconButton
          onClick={previousEnabled ? onPreviousClick : null}
          disabled={!previousEnabled}
        >
          <ArrowBackIosIcon fontSize="large" />
        </StyledIconButton>
        <StyledIconButton
          onClick={nextEnabled ? onNextClick : null}
          disabled={!nextEnabled}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </StyledIconButton>
        <Title style={{ marginLeft: 16 }}>{currentDirectory}</Title>
      </NavigationContainer>

      <ActionContainer>
        <StyledButton
          variant="contained"
          component="span"
          onClick={onNewFolderClick}
        >
          CREATE DIRECTORY
        </StyledButton>{" "}
        <FileUpload
          currentDirectory={currentDirectory}
          onFileUpload={onFileUpload}
        />
        <StyledRefreshButton onClick={onRefreshClick}>
          <SpinningIcon fontSize="large" />
        </StyledRefreshButton>
      </ActionContainer>
    </StyledHeader>
  );
};

Header.propTypes = {
  currentDirectory: PropTypes.string,
  nextEnabled: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  previousEnabled: PropTypes.bool,
};

export default Header;
