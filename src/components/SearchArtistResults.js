// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import { selectRecommendationSeed } from '../redux/actions';
// import { artistsSelector, topArtistsSelector } from '../selectors';

// const useStyles = makeStyles(theme => ({
// 	gridList: {
// 		flexWrap: 'nowrap',
// 		transform: 'translateZ(0)',
// 	},
// 	pointer: {
// 		cursor: 'pointer',
// 	},
// 	title: {
// 		color: theme.palette.primary.light,
// 		textAlign: 'initial',
// 	},
// 	titleBar: {
// 		background:
// 			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
// 	},
// }));

// const getArtistImageUrl = images => {
// 	console.log('images', images);
// 	const lastItem = images.slice(-1).pop();

// 	return lastItem ? lastItem.url : '';
// };

// export const SearchArtistResults = props => {
// 	const { searchArtistsOptions, topArtistOptions } = useSelector(state => {
// 		return {
// 			searchArtistsOptions: artistsSelector(state),
// 			topArtistOptions: topArtistsSelector(state),
// 		};
// 	});

// 	let artistOptions =
// 		searchArtistsOptions.length < 1 ? topArtistOptions : searchArtistsOptions;

// 	return <ArtistResults artists={artistOptions} />;
// };
