import React, { Component } from 'react'
import { Select, Button, MenuItem, InputLabel, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MyFormControl from '../utils/MyFormControl'
import moment from 'moment'

class FilterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            disableLookup: false
        }
    }

    handleYearChange = (event) => {
        this.setState({
            year: event.target.value,
            month: "",
            disableLookup: true
        })
    }

    handleMonthChange = (event) => {
        this.setState({
            month: event.target.value,
            disableLookup: false
        })
    }

    handleLookup = () => {
        const { year, month } = this.state;
        this.props.onLookup(year, month);
    }

    render() {
        const { year, month, disableLookup } = this.state;
        return (
            <Box display="flex" justifyContent="flex-end" alignItems='center'>
                <Box>
                    <MyFormControl>
                        <InputLabel id="year-select-label">Year</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select"
                            value={year}
                            onChange={this.handleYearChange}
                        >
                            <MenuItem value={2019}>2019</MenuItem>
                            <MenuItem value={2020}>2020</MenuItem>
                        </Select>
                    </MyFormControl>
                    <MyFormControl>
                        <InputLabel id="month-select-label">Month</InputLabel>
                        <Select
                            labelId="month-select-label"
                            id="month-select"
                            value={month}
                            onChange={this.handleMonthChange}
                        >
                            {moment.monthsShort().map((name, index) => (
                                <MenuItem key={name} value={index}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </MyFormControl>
                </Box>

                <MyFormControl>
                    <Button
                        variant="contained"
                        onClick={this.handleLookup}
                        color='primary'
                        disabled={disableLookup}
                        startIcon={<SearchIcon />}>Lookup</Button>
                </MyFormControl>
            </Box>
        )
    }

}
export default FilterView