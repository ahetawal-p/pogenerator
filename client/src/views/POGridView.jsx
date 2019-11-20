import React, { Component } from 'react';
import MaterialTable from 'material-table';
import * as moment from 'moment';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import getDocDefinition from '../pdf/pdfdef';
import {
  workTypes,
  currencyTypes,
  editableFields,
  readableFields,
  allColumns
} from '../utils/columnData';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import FilterView from './FilterView';
import { getPOData } from '../service/getPOData';
import * as poActions from '../actions/POAction';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const wait = ms => new Promise(r => setTimeout(r, ms));
const allFields = [...editableFields, ...readableFields];
const today = moment();

class POGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      yearValue: today.year(),
      monthValue: today.month(),
      isLoading: true
    };
  }

  async componentDidMount() {
    const data = await getPOData(today.year(), today.month() + 1);
    this.setState({
      data,
      isLoading: false
    });
  }

  addNewEntry = async newData => {
    const inValids = [];
    editableFields.forEach(item => {
      if (!newData[item]) {
        inValids.push(item);
      }
    });
    if (inValids.length > 0) {
      alert('Missing fields: \n' + inValids.join('\n'));
      throw new Error('Missing fields');
    }
    await wait(1000);
    const data = this.state.data;
    data.push(newData);
    this.setState({ data });
  };

  editEntry = async (newData, oldData) => {
    await wait(1000);
    const data = this.state.data;
    const index = data.indexOf(oldData);
    data[index] = newData;
    this.setState({ data });
  };

  deleteEntry = async oldData => {
    await wait(1000);
    let data = this.state.data;
    const index = data.indexOf(oldData);
    data.splice(index, 1);
    this.setState({ data });
  };

  generatePOPDF = (event, rowData) => {
    const templateData = {};
    allFields.forEach(item => {
      let currentData = rowData[item];
      if (item === 'workType') {
        currentData = workTypes[currentData];
      }
      if (item === 'currency') {
        currentData = currencyTypes[currentData];
      }
      templateData[item] = currentData;
    });
    pdfMake.createPdf(getDocDefinition(templateData)).download();
  };

  onLookup = async (year, month) => {
    console.log(month);
    this.setState({
      isLoading: true,
      yearValue: year,
      monthValue: month
    });
    const data = await getPOData(year, month + 1);
    this.setState({
      data,
      isLoading: false
    });
  };

  render() {
    const { isLoading, yearValue, monthValue } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          width: '100%'
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <div>
            <FilterView
              year={yearValue}
              month={monthValue}
              onLookup={this.onLookup}
            />
            <MaterialTable
              title="PO Entry"
              columns={allColumns}
              style={{ marginBottom: 10 }}
              data={this.state.data}
              actions={[
                {
                  icon: PictureAsPdfIcon,
                  tooltip: 'Generate PO PDF',
                  // isFreeAction:true,
                  onClick: this.generatePOPDF
                }
              ]}
              options={{
                paging: false,
                search: false,
                exportButton: true,
                addRowPosition: 'first',
                headerStyle: {
                  padding: 10,
                  whiteSpace: 'nowrap',
                  backgroundColor: '#039be5'
                }
              }}
              editable={{
                onRowAdd: this.addNewEntry,
                onRowUpdate: this.editEntry,
                onRowDelete: this.deleteEntry
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(POGridView);
