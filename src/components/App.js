import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { Login } from './Login';
import Main from './Main';

import { accessTokenSelector } from 'selectors';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing.unit * 4
  }
});

const App = props => {
  const { classes } = props;
  const { accessToken } = props;

  return (
    <div className={classes.container}>
      <header>
        <h1>Spotify BPM</h1>
      </header>
      <main>{!accessToken ? <Login /> : <Main />}</main>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    accessToken: accessTokenSelector(state)
    // tracks: recommendedTracksSelector(state),
    // selectedArtists: selectedArtistsSelector(state),
    // selectedTempo: selectedTempoSelector(state),
    // user: userSelector(state),
  };
};

// const mapDispatchToProps = {
//   createPlaylist,
//   selectArtist,
//   fetchRecommendedTracks,
// }

export default connect(
  mapStateToProps
  // mapDispatchToProps,
)(withStyles(styles)(App));
