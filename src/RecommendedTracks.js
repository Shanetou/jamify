import React, { Component } from "react";

import { Well, Table } from "react-bootstrap";

const getArtistsNames = artists =>
  artists.map(artist => artist.name).join(", ");

export const TrackRow = props => {
  const { track } = props;
  const {
    artists,
    name,
    album: { name: albumName }
  } = track;
  const artistNames = getArtistsNames(artists);

  return (
    <tr>
      <td>{name}</td>
      <td>{artistNames}</td>
      <td className="hidden-xs">{albumName}</td>
    </tr>
  );
};

export default class RecommendedTracks extends Component {
  render() {
    const { tracks } = this.props;

    return (
      <Well className="rec-tracks">
        {/* <Button className='pull-right' onClick={handleAddClick}>
          + Add to Spotify
        </Button> */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th className="hidden-xs">Album</th>
            </tr>
          </thead>

          <tbody>
            {tracks.map(track => (
              <TrackRow key={track.id} track={track} />
            ))}
          </tbody>
        </Table>
      </Well>
    );
  }
}
