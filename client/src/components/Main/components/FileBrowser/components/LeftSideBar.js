import React from "react";
import PropTypes from "prop-types";

import { Grid2 } from "@mui/material";
import styled from "styled-components";
import Location from "./Location";
import Title from "../assets/Title";

const StyledLeftSideBar = styled(Grid2)`
  border-bottom-left-radius: 9px;
  border-top-left-radius: 9px;
  background-color: #2a2a2f;
  border-right: 1px solid black;
  padding: 16px;
`;

const LeftAlignGrid = styled(Grid2)`
  text-align: left;
`;

const LocationItems = styled.div`
  margin-top: 8px;
`;

const LeftSideBar = ({ locations, onLocationClick }) => (
  <StyledLeftSideBar size={2}>
    <Grid2 container justifyContent="flex-start">
      <LeftAlignGrid size={12}>
        <Title>Favorites</Title>
      </LeftAlignGrid>
      <LocationItems>
        {locations.map((location) => {
          const key = location.drive + locations.label;
          return (
            <LeftAlignGrid size={12} key={key}>
              <Location
                onClick={() => onLocationClick(location)}
                location={location}
              />
            </LeftAlignGrid>
          );
        })}
      </LocationItems>
    </Grid2>
  </StyledLeftSideBar>
);

LeftSideBar.propTypes = {
  locations: PropTypes.array,
  onLocationClick: PropTypes.func,
};

export default LeftSideBar;
