import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import moment from 'moment';
import getDocDefinition from '../pdf/pdfdef';
import {
  workTypes,
  currencyTypes,
  editableFields,
  readableFields,
  getAllColumns
} from '../utils/columnData';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import FilterView from './FilterView';
import * as poActions from '../actions/POAction';
import * as userActions from '../actions/UserAction';
import localizeImage from '../pdf/localizeImage';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const allFields = [...editableFields, ...readableFields];
const today = new Date();

class POGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yearValue: today.getFullYear(),
      monthValue: today.getMonth()
    };
  }

  componentDidMount() {
    const { yearValue, monthValue } = this.state;
    const { dispatch } = this.props;
    dispatch(poActions.getAllPOs({ year: yearValue, month: monthValue + 1 }));
  }

  createOrUpdatePO = newData => {
    const inValids = [];
    const { isAdmin } = this.props;
    editableFields.forEach(item => {
      if (!newData[item] && item !== 'paymentStatus') {
        inValids.push(item);
      }
    });
    if (inValids.length > 0) {
      alert('Missing fields: \n' + inValids.join('\n'));
      throw new Error('Missing fields');
    }
    const { yearValue, monthValue } = this.state;
    const { dispatch } = this.props;
    newData['year'] = yearValue;
    newData['month'] = monthValue + 1;
    dispatch(poActions.createPO(newData));
  };

  addNewEntry = async newData => {
    this.createOrUpdatePO(newData);
  };

  editEntry = async (newData, oldData) => {
    this.createOrUpdatePO(newData);
  };

  deleteEntry = async oldData => {
    const { yearValue, monthValue } = this.state;
    const { dispatch } = this.props;
    dispatch(
      poActions.deletePO(oldData.poNumber, {
        year: yearValue,
        month: monthValue + 1
      })
    );
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
      if (item === 'createdOn') {
        currentData = moment(currentData).format('DD/MM/YYYY');
      }
      templateData[item] = currentData;
    });
    pdfMake.createPdf(getDocDefinition(templateData)).download();
  };

  onLookup = (year, month) => {
    const { dispatch } = this.props;
    this.setState({
      yearValue: year,
      monthValue: month
    });
    dispatch(poActions.getAllPOs({ year, month: month + 1 }));
  };

  onLogout = () => {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  };

  render() {
    const { yearValue, monthValue } = this.state;
    const { allPOs, allPOsLoading, isAdmin } = this.props;
    const allColumns = getAllColumns(isAdmin);
    return (
      <div
        style={{
          height: '100vh',
          width: '100%'
        }}
      >
        {allPOsLoading ? (
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
            <div className="row">
              <div className="col">
                <img src={`${localizeImage}`} width={100} alt={'Logo'} />
                <h4>Localize PO Entry</h4>
              </div>
              <div className="col">
                <div className="float-right">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={this.onLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <FilterView
              year={yearValue}
              month={monthValue}
              onLookup={this.onLookup}
            />
            <MaterialTable
              columns={allColumns}
              style={{ marginBottom: 10 }}
              data={allPOs}
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
                showTitle: false,
                exportButton: isAdmin ? true : false,
                addRowPosition: 'first',
                headerStyle: {
                  padding: 10,
                  whiteSpace: 'nowrap',
                  backgroundColor: '#039be5'
                }
              }}
              editable={{
                onRowAdd: this.addNewEntry,
                onRowUpdate: isAdmin ? this.editEntry : undefined,
                onRowDelete: isAdmin ? this.deleteEntry : undefined
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allPOsLoading, allPOs } = state.po;
  const { isAdmin } = state.user.user;
  return {
    allPOsLoading,
    allPOs,
    isAdmin
  };
}
export default connect(mapStateToProps)(POGridView);
