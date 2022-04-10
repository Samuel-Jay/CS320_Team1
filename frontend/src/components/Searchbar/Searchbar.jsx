// import './styles.css';
// import background from './styles/img/background.png'

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Searchbar = () => {

	const Search = styled('div')(({ theme }) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing(3),
		  width: 'auto',
		},
	}));
	  
	  
	const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	// const Toolbar = styled('div')(({ theme }) => ({
	// 	padding: theme.spacing(0, 2),
	// 	// height: '100%',
	// 	position: 'static',
	// 	// pointerEvents: 'none',
	// 	display: 'block',
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	backgroundImage: 'background.png'
	// }));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
		  padding: theme.spacing(1, 1, 1, 0),
		  // vertical padding + font size from searchIcon
		  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		  transition: theme.transitions.create('width'),
		  width: '100%',
		  [theme.breakpoints.up('md')]: {
			width: '12ch',
		  },
		},
	}));

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
			  <Toolbar
			  	sx={{justifyContent: "space-between"}}>
				<Search>
				  <SearchIconWrapper>
					<SearchIcon />
				  </SearchIconWrapper>
				  <StyledInputBase
					placeholder="Search…"
					inputProps={{ 'aria-label': 'search' }}
				  />
				</Search>
				<Typography
            		variant="h6"
            		noWrap
            		component="div"
            		sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          		>
          		</Typography>
			  </Toolbar>
			</AppBar>
		</Box>
	);
}
	
export default Searchbar



// export default function SearchAppBar() {
// 	return (
// 	  <Box sx={{ flexGrow: 1 }}>
// 		<AppBar position="fixed">
// 		  <Toolbar
// 			  sx={{justifyContent: "space-between"}}>
// 			<Search>
// 			  <SearchIconWrapper>
// 				<SearchIcon />
// 			  </SearchIconWrapper>
// 			  <StyledInputBase
// 				placeholder="Search…"
// 				inputProps={{ 'aria-label': 'search' }}
// 			  />
// 			</Search>
// 		  </Toolbar>
// 		</AppBar>
// 	  </Box>
// 	);
//   }