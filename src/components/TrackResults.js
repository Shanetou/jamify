import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { selectedTracksSelector, tracksSelector } from "../selectors";
import { millisecondsToMinutesAndSeconds } from "../utils";
import {
  createPlaylist,
  deselectAllTracks,
  selectAllTracks,
  toggleTrack
} from "../redux/actions";

const PlaylistActions = props => {
  const { onClick, canCreatePlaylist } = props;
  return (
    <div>
      <Button disabled={!canCreatePlaylist} onClick={onClick}>
        Save to Spotify
      </Button>
    </div>
  );
};

const useAudio = sourceUrl => {
  const [audio] = useState(new Audio(sourceUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    const play = () => {
      // We handle the promise returned by play
      // to account for a race condition and existing issue in Chrome
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      var playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(_error => {
          toggle();
        });
      }
    };

    isPlaying ? play() : audio.pause();

    return function cleanup() {
      audio.pause();
      audio.remove();
    };
  }, [audio, isPlaying]);

  return [isPlaying, toggle];
};

const TrackPlayer = ({ track }) => {
  // eslint-disable-next-line no-unused-vars
  const [_isPlaying, toggle] = useAudio(track.preview_url);

  return (
    <IconButton onMouseEnter={toggle} onMouseLeave={toggle}>
      <PlayCircleOutlineIcon />
    </IconButton>
  );
};

const TrackPreviewPlayer = ({ track }) => {
  return track.preview_url !== null ? (
    <TrackPlayer track={track} />
  ) : (
    <IconButton disabled={true}>
      <PlayCircleOutlineIcon />
    </IconButton>
  );
};

export const TrackResults = props => {
  const dispatch = useDispatch();
  const { selectedTracks, tracks } = useSelector(state => {
    return {
      selectedTracks: selectedTracksSelector(state),
      tracks: Object.values(tracksSelector(state))
    };
  });

  const areAllChecked =
    selectedTracks.length > 0 && selectedTracks.length === tracks.length;
  let areSomeButNotAllChecked = selectedTracks.length > 0 && !areAllChecked;

  const handleCheckboxAllClick = _event => {
    areAllChecked ? dispatch(deselectAllTracks()) : dispatch(selectAllTracks());
  };

  const handleCheckboxClick = trackUri => () => {
    dispatch(toggleTrack(trackUri));
  };

  const handleSavePlaylistClick = () => {
    dispatch(createPlaylist());
  };

  return (
    <div>
      <h3>Recommendations</h3>
      <PlaylistActions
        onClick={handleSavePlaylistClick}
        canCreatePlaylist={selectedTracks.length > 0}
      />
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={areAllChecked}
                  indeterminate={areSomeButNotAllChecked}
                  onChange={handleCheckboxAllClick}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Artist</TableCell>
              <TableCell align="right">Length</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map(track => {
              const duration = millisecondsToMinutesAndSeconds(
                track.duration_ms
              );

              return (
                <TableRow hover key={track.id}>
                  <TableCell component="th" scope="row">
                    <Checkbox
                      checked={selectedTracks.includes(track.uri)}
                      onChange={handleCheckboxClick(track.uri)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {track.name}
                  </TableCell>
                  <TableCell align="right">{track.artists[0].name}</TableCell>
                  <TableCell align="right">{duration}</TableCell>
                  <TableCell align="right">
                    <TrackPreviewPlayer track={track} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// {
//   "tracks": [
//     {
//       "album": {
//         "album_type": "ALBUM",
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/6Dd3NScHWwnW6obMFbl1BH"
//             },
//             "href": "https://api.spotify.com/v1/artists/6Dd3NScHWwnW6obMFbl1BH",
//             "id": "6Dd3NScHWwnW6obMFbl1BH",
//             "name": "Daya",
//             "type": "artist",
//             "uri": "spotify:artist:6Dd3NScHWwnW6obMFbl1BH"
//           }
//         ],
//         "external_urls": {
//           "spotify": "https://open.spotify.com/album/0qrB9JjkcCjQQK7S1eFrcX"
//         },
//         "href": "https://api.spotify.com/v1/albums/0qrB9JjkcCjQQK7S1eFrcX",
//         "id": "0qrB9JjkcCjQQK7S1eFrcX",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/b6fd16c64a33a1ba7f46dc77e3d05666ce0c7b6e",
//             "width": 640
//           },
//           {
//             "height": 300,
//             "url": "https://i.scdn.co/image/7b5fda72df4dc28f605219c0f46148f8efea45b9",
//             "width": 300
//           },
//           {
//             "height": 64,
//             "url": "https://i.scdn.co/image/309dcb20a80b536433c3b0390babc705e8ea2cc0",
//             "width": 64
//           }
//         ],
//         "name": "Safe",
//         "release_date": "2018-06-22",
//         "release_date_precision": "day",
//         "total_tracks": 0,
//         "type": "album",
//         "uri": "spotify:album:0qrB9JjkcCjQQK7S1eFrcX"
//       },
//       "artists": [
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/6Dd3NScHWwnW6obMFbl1BH"
//           },
//           "href": "https://api.spotify.com/v1/artists/6Dd3NScHWwnW6obMFbl1BH",
//           "id": "6Dd3NScHWwnW6obMFbl1BH",
//           "name": "Daya",
//           "type": "artist",
//           "uri": "spotify:artist:6Dd3NScHWwnW6obMFbl1BH"
//         }
//       ],
//       "disc_number": 1,
//       "duration_ms": 200661,
//       "explicit": false,
//       "external_ids": {
//         "isrc": "USUG11801180"
//       },
//       "external_urls": {
//         "spotify": "https://open.spotify.com/track/12wAQ0HNbJWVrVJA3woXDb"
//       },
//       "href": "https://api.spotify.com/v1/tracks/12wAQ0HNbJWVrVJA3woXDb",
//       "id": "12wAQ0HNbJWVrVJA3woXDb",
//       "is_local": false,
//       "is_playable": true,
//       "name": "Safe",
//       "popularity": 65,
//       "preview_url": null,
//       "track_number": 1,
//       "type": "track",
//       "uri": "spotify:track:12wAQ0HNbJWVrVJA3woXDb"
//     },
//     {
//       "album": {
//         "album_type": "ALBUM",
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/4NHQUGzhtTLFvgF5SZesLK"
//             },
//             "href": "https://api.spotify.com/v1/artists/4NHQUGzhtTLFvgF5SZesLK",
//             "id": "4NHQUGzhtTLFvgF5SZesLK",
//             "name": "Tove Lo",
//             "type": "artist",
//             "uri": "spotify:artist:4NHQUGzhtTLFvgF5SZesLK"
//           }
//         ],
//         "external_urls": {
//           "spotify": "https://open.spotify.com/album/6jggnLM3SdDnjQ3GWmIZ4L"
//         },
//         "href": "https://api.spotify.com/v1/albums/6jggnLM3SdDnjQ3GWmIZ4L",
//         "id": "6jggnLM3SdDnjQ3GWmIZ4L",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/dc7bbcd3d046104c6e16b3edc8eb276081ac6b50",
//             "width": 640
//           },
//           {
//             "height": 300,
//             "url": "https://i.scdn.co/image/73e8f30d32e685503f62655ebd3998e2c9818604",
//             "width": 300
//           },
//           {
//             "height": 64,
//             "url": "https://i.scdn.co/image/733658e11a2481fa80df775209b9cd185de2a033",
//             "width": 64
//           }
//         ],
//         "name": "BLUE LIPS (lady wood phase II)",
//         "release_date": "2017-11-17",
//         "release_date_precision": "day",
//         "total_tracks": 0,
//         "type": "album",
//         "uri": "spotify:album:6jggnLM3SdDnjQ3GWmIZ4L"
//       },
//       "artists": [
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/4NHQUGzhtTLFvgF5SZesLK"
//           },
//           "href": "https://api.spotify.com/v1/artists/4NHQUGzhtTLFvgF5SZesLK",
//           "id": "4NHQUGzhtTLFvgF5SZesLK",
//           "name": "Tove Lo",
//           "type": "artist",
//           "uri": "spotify:artist:4NHQUGzhtTLFvgF5SZesLK"
//         }
//       ],
//       "disc_number": 1,
//       "duration_ms": 223794,
//       "explicit": true,
//       "external_ids": {
//         "isrc": "SEUM71700736"
//       },
//       "external_urls": {
//         "spotify": "https://open.spotify.com/track/1TIiWomS4i0Ikaf9EKdcLn"
//       },
//       "href": "https://api.spotify.com/v1/tracks/1TIiWomS4i0Ikaf9EKdcLn",
//       "id": "1TIiWomS4i0Ikaf9EKdcLn",
//       "is_local": false,
//       "is_playable": true,
//       "name": "disco tits",
//       "popularity": 64,
//       "preview_url": null,
//       "track_number": 2,
//       "type": "track",
//       "uri": "spotify:track:1TIiWomS4i0Ikaf9EKdcLn"
//     },
