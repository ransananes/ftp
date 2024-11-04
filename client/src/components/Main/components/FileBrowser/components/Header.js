import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  width: 36px; /* Explicit width for consistent icon size */
  height: 36px; /* Explicit height for consistent icon size */
  padding: 0;
  &:hover {
    color: #3c8dbc;
    transform: scale(1.1);
    transition: color 0.3s, transform 0.3s;
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
        <Button
          variant="contained"
          component="span" // Use "span" as the component for the label
          color="transparent"
          style={{color:"white", border:"1px solid white"}}
          onClick={onNewFolderClick}
        >
          Create Directory
        </Button>{" "}
        <FileUpload
          currentDirectory={currentDirectory}
          onFileUpload={onFileUpload}
        />
        <StyledIconButton onClick={() => console.log("Refresh")}>
          <RefreshIcon fontSize="large" />
        </StyledIconButton>
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
