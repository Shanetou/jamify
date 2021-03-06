import { makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAndPopulatePlaylist,
  deselectAllTracks,
  selectAllTracks,
  toggleTrack
} from "../redux/actions";
import {
  isTracksRequestPending,
  playlistsSelector,
  selectedTracksSelector,
  tracksSelector
} from "../selectors";
import { millisecondsToMinutesAndSeconds } from "../utils";

const PlaylistActions = props => {
  const { onClick, canCreatePlaylist } = props;
  return (
    <Button
      size="small"
      variant="contained"
      disabled={!canCreatePlaylist}
      color="primary"
      onClick={onClick}
    >
      <AddIcon />
      Save to Spotify
    </Button>
  );
};

const useAudio = sourceUrl => {
  const [audio] = useState(new Audio(sourceUrl));
  const [isPlaying, setIsPlaying] = useState(false);
  const toggle = useCallback(() => setIsPlaying(!isPlaying), [isPlaying]);

  useEffect(() => {
    const play = () => {
      // We handle the promise returned by play
      // to account for a race condition and existing issue in Chrome
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(_error => {
          toggle();
        });
      }
    };

    if (isPlaying) {
      play();
    } else {
      audio.pause();
    }

    return function cleanup() {
      audio.pause();
      audio.remove();
    };
  }, [audio, isPlaying, toggle]);

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

const TrackPreviewPlayer = ({ track }) =>
  track.preview_url !== null ? (
    <TrackPlayer track={track} />
  ) : (
    <IconButton disabled>
      <PlayCircleOutlineIcon />
    </IconButton>
  );

export const TrackResults = _props => {
  const useStyles = makeStyles(theme => ({
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2)
    },
    headerTitle: {
      display: "inline-block",
      paddingRight: theme.spacing(1)
    },
    songTitleTableCell: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem"
    }
  }));
  const classes = useStyles();

  const dispatch = useDispatch();
  const {
    tracksRequestPending,
    isPlaylistRequestPending,
    selectedTracks,
    tracks
  } = useSelector(state => ({
    selectedTracks: selectedTracksSelector(state),
    tracks: Object.values(tracksSelector(state)),
    tracksRequestPending: isTracksRequestPending(state),
    isPlaylistRequestPending: playlistsSelector(state).isAddToSpotifyPending
  }));

  const allChecked =
    selectedTracks.length > 0 && selectedTracks.length === tracks.length;
  const someButNotAllChecked = selectedTracks.length > 0 && !allChecked;

  const handleCheckboxAllClick = _event => {
    if (someButNotAllChecked || allChecked) {
      dispatch(deselectAllTracks());
    } else {
      dispatch(selectAllTracks());
    }
  };

  const handleCheckboxClick = trackUri => () => {
    dispatch(toggleTrack(trackUri));
  };

  const handleSavePlaylistClick = () => {
    dispatch(createAndPopulatePlaylist());
  };

  return (
    <>
      <div className={classes.headerContainer}>
        <div>
          <Typography className={classes.headerTitle} variant="h6">
            Recommendations
          </Typography>
          {tracksRequestPending && <CircularProgress size={16} />}
        </div>
        <PlaylistActions
          onClick={handleSavePlaylistClick}
          canCreatePlaylist={
            selectedTracks.length > 0 && !isPlaylistRequestPending
          }
        />
      </div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allChecked}
                  indeterminate={someButNotAllChecked}
                  onChange={handleCheckboxAllClick}
                />
              </TableCell>
              <TableCell />
              <TableCell align="right" />
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTracks.includes(track.uri)}
                      onChange={handleCheckboxClick(track.uri)}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.songTitleTableCell}
                    // For accessibility
                    component="th"
                    scope="row"
                  >
                    <Typography>{track.name}</Typography>
                    {track.artists[0].name}
                  </TableCell>
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
    </>
  );
};
