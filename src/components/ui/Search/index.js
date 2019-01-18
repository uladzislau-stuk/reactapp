import React from 'react';
// import PropTypes from 'prop-types';
import style from './styles.scss';
import { IconButton, InputBase, Paper } from '@material-ui/core/';

const Search = (props) => {
	const { visible, change, onClickClearBtn } = props;
	const clearBtnStyle = {
		display: visible ? 'block' : 'none'
	};
	return (
		<Paper className={ style.search } elevation={4}>
			<InputBase id='autocomplete' className={ style.searchField } onChange={ change } placeholder="Search city" />
			<IconButton onClick={ onClickClearBtn } style={clearBtnStyle}>
				<i className="material-icons">clear</i>
			</IconButton>
			<IconButton>
				<i className="material-icons">search</i>
			</IconButton>
		</Paper>
	);
};

export default Search;