import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col, Image } from "react-bootstrap";

import { chunk } from "./utils";
import { selectRecommendationSeed } from "redux/actions";
import { topArtistsSelector, selectedArtistsSelector } from "selectors";

const UseArtistsAction = props => {
  const { selectedArtists, onClick } = props;
  const isDisabled = selectedArtists.length < 1;

  return (
    <div style={{ textAlign: "center" }}>
      <h3>
        Select the artists that inspire your guarding.{" "}
        <small>({selectedArtists.length}/5)</small>
      </h3>
    </div>
  );
};

const ArtistImage = props => {
  const { artist } = props;
  const images = artist.images;

  if (images.length > 0) {
    let src = images[0].url;
    if (images[2]) {
      src = images[2].url;
    }
    if (images[1]) {
      src = images[1].url;
    }

    return (
      <Image
        responsive
        rounded
        className="artist-image"
        src={src}
        alt={artist.name}
      />
    );
  }
};

const ArtistListItem = props => {
  const { artist, handleArtistClick, selectedArtists } = props;
  const isSelected = selectedArtists.includes(artist.id);
  const isDisabled = selectedArtists.length >= 5 && !isSelected;

  let containerClasses = `artist-image-container ${
    isSelected ? "selected" : ""
  }`;
  containerClasses += isDisabled ? "disabled" : "";

  const handleClick = () => {
    handleArtistClick(artist.id);
  };

  return (
    <Col sm={3} xs={6} key={artist.name} onClick={handleClick}>
      <div className={containerClasses}>
        <h3 className="text-center">{artist.name}</h3>
        <ArtistImage artist={artist} />
      </div>
    </Col>
  );
};

export const TopArtists = props => {
  const { artists, selectedArtists } = props;
  const { selectRecommendationSeed, handleSubmitClick } = props;

  const artistGroups = chunk(artists, 4);

  return (
    <div>
      <Grid>
        <UseArtistsAction
          selectedArtists={selectedArtists}
          onClick={handleSubmitClick}
        />
        {artistGroups.map((artistGroup, idx) => (
          <Row key={idx} className="artist-images-row">
            {artistGroup.map(artist => (
              <ArtistListItem
                artist={artist}
                key={artist.name}
                handleArtistClick={selectRecommendationSeed}
                {...props}
              />
            ))}
          </Row>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    artists: topArtistsSelector(state),
    selectedArtists: selectedArtistsSelector(state)
  };
};

const mapDispatchToProps = {
  selectRecommendationSeed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopArtists);
