import { Button, Checkbox, FormControlLabel, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';

function App() {
	const classes = useStyle();
	const button = [ '+', '-', 'x', '/' ];

	const [ value, setValue ] = useState({
		item1: { value: 0, check: true },
		item2: { value: 0, check: true },
		item3: { value: 0, check: true }
	});

	const [ isAlertOpen, setIsAlertOpen ] = useState(false);

	const [ finalValue, setFinalValue ] = useState(0);

	const handleChecked = (name, val) => {
		setValue((prev) => ({ ...prev, [name]: { ...prev[name], check: !val } }));
	};

	const handleChangeValue = (name, val) => {
		setValue((prev) => ({ ...prev, [name]: { ...prev[name], value: Number(val) } }));
	};

	const handleOperate = (input) => {
		let res = 0;
		const obj = Object.keys(value)
			.map((key) => {
				return value[key];
			})
			.filter((val) => {
				return val.check === true;
			});
		if (obj.length < 2) {
			setFinalValue(0);
			setIsAlertOpen(true);
			return;
		}
		res = obj[0].value;
		obj.forEach((item, id) => {
			if (id === 0) return;
			switch (input) {
				case '+':
					res += item.value;
					break;
				case '-':
					res -= item.value;
					break;
				case 'X':
					res *= item.value;
					break;
				case '/':
					res /= item.value;
				default:
					break;
			}
		});
		setFinalValue(res);
	};

	return (
		<div>
			<Collapse style={{ position: 'fixed', left: '35%', top: '30px' }} in={isAlertOpen}>
				<Alert
					severity="error"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setIsAlertOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					Error, at least 2 boxes checked
				</Alert>
			</Collapse>

			<div className={classes.root}>
				<div className={classes.wrapper}>
					<TextField
						variant="outlined"
						className={classes.input}
						value={value.item1.value}
						name="item1"
						onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.item1.check}
								onChange={(e) => handleChecked(e.target.name, value.item1.check)}
								name="item1"
								color="primary"
							/>
						}
					/>
				</div>
				<div className={classes.wrapper}>
					<TextField
						variant="outlined"
						className={classes.input}
						value={value.item2.value}
						name="item2"
						onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.item2.check}
								onChange={(e) => handleChecked(e.target.name, value.item2.check)}
								name="item2"
								color="primary"
							/>
						}
					/>
				</div>
				<div className={classes.wrapper}>
					<TextField
						variant="outlined"
						className={classes.input}
						value={value.item3.value}
						name="item3"
						onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={value.item3.check}
								onChange={(e) => handleChecked(e.target.name, value.item3.check)}
								name="item3"
								color="primary"
							/>
						}
					/>
				</div>
				<div className={classes.buttonWrapper}>
					{button.map((item, id) => (
						<Button
							className={classes.button}
							onClick={(e) => handleOperate(e.target.innerText)}
							variant="contained"
							color="primary"
						>
							{item}
						</Button>
					))}
				</div>
				<div className={classes.output}>
					<h2>Hasil : </h2>
					<h2>{finalValue}</h2>
				</div>
			</div>
		</div>
	);
}

export default App;

const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: '#c0d1c5',
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	output: {
		width: '25%',
		borderTop: '2px solid black',
		display: 'flex',
		justifyContent: 'space-between'
	},
	input: {
		marginBottom: '10px'
	},
	buttonWrapper: {
		width: '25%',
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: '10px'
	},
	button: {
		marginRight: '10px'
	},
	wrapper: {
		width: '25%',
		display: 'flex',
		justifyContent: 'space-between'
	}
}));
