import {Component} from "react";
import * as React from 'react';
import {connect} from "react-redux";
import {
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import {getTransferListAction} from "../Redux/ActionCreators";
import "../Assets/Styles/table.css"
import addWeeks from 'date-fns/addWeeks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import {MobileDateRangePicker} from "@mui/lab";
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    {id: 'creditAccount', label: 'Credit Account', minWidth: 170},
    {id: 'valueDate', label: 'Date', minWidth: 100},
    {id: 'amount', label: 'Amount', minWidth: 100},
    {id: 'reason', label: 'Reason', minWidth: 100},

];

function getWeeksAfter(date, amount) {
    return date ? addWeeks(date, amount) : undefined;
}

class HistoryTransferComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            user: this.props.session.user,
            page: 0,
            rowsPerPage: 10,
            rows: this.props.data.transfers,
            dates: [null, null],
            search: "",
        };
    };

    componentDidMount() {
        if(this.props.data.transfers.length===0) {
            this.props.dispatch(getTransferListAction(this.state.user.id))
                .then(data => {
                    this.setState({
                        rows: data.payload.data,
                    });
                }).catch(err => {
                console.log(err);
            })
        }
    }


    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage,
        })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: event.target.value,
        })
    };
    getDateFormat = (value) => {
        const d = new Date(value);
        return [String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0'), d.getFullYear()].join("/");
    }
    displayValue = (column, value) => {
        switch (column) {
            case "valueDate":
                return this.getDateFormat(value);
            case "amount":
                return value.toFixed(2) + " MAD";
            default :
                return value;
        }

    }
    filterByDate = () => {
        const {dates, rows} = this.state;
        if (dates[0] && dates[1]) {
            return rows.filter(row => {
                const date = new Date(row.valueDate);
                console.log(dates[0] <= date && date <= dates[1]);
                return dates[0] <= date && date <= dates[1]
            });
        }
        return rows;
    }
    handleSearch = (event)=>{
        this.setState({
            search : event.target.value,
        });
    }
    searchByReason = (rows)=>{
        const search = this.state.search;
        if(search!==""){
            return rows.filter(row => row.reason.includes(search));
        }
        return rows;
    }
    allFilter = ()=>{
        return this.searchByReason(this.filterByDate());
    }


    render() {
        const {page, rowsPerPage, rows, dates, search} = this.state;
        return (
            <div className={"table"}>
                <div className={"tools"}>
                    <div className={"dateRange"}>
                    <p>Date Range (up to 4 weeks)</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <MobileDateRangePicker
                            // disablePast
                            value={dates}
                            maxDate={getWeeksAfter(dates[0], 4)}
                            onChange={(newValue) => {
                                this.setState({dates: newValue});
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{mx: 2}}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    </div>
                    <div className={"search"}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Search" multiline
                        maxRows={4}
                        value={search}
                        onChange={this.handleSearch}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                </div>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 500}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.allFilter()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {this.displayValue(column.id, value)}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({session: state.session, data: state.data});
export default connect(mapStateToProps)(HistoryTransferComponent);
