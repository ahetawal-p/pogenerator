import React from 'react';
import moment from 'moment';

export const workTypes = {
  1: 'Translation',
  2: 'Voice Over',
  3: 'Transcription',
  4: 'SRT Creation',
  5: 'Transcription + VTT',
  6: 'Translation Update',
  7: 'Voice Over Update',
  8: 'eLearning Integration'
};

export const currencyTypes = {
  1: 'USD',
  2: 'EURO',
  3: 'INR',
  4: 'GBP'
};

export const editableFields = [
  'createdOn',
  'projectName',
  'localizePM',
  'clientName',
  'clientPM',
  'vendorName',
  'vendorMailId',
  'workType',
  'language',
  'wordCount',
  'vendorCost',
  'currency',
  'paymentStatus'
];

export const readableFields = [
  'poNumber',
  'createdBy',
  'systemCreatedOn',
  'modifiedOn'
];

export function getAllColumns(isAdmin) {
  const allColumns = [
    { title: 'PO Number', field: readableFields[0], editable: 'never' },
    {
      title: 'Create Date',
      field: editableFields[0],
      type: 'date',
      render: rowData => moment(rowData.createdOn).format('DD/MM/YYYY')
    },
    {
      title: 'Project Name',
      field: editableFields[1],
      editComponent: props => (
        <textarea
          name="txtDescEd"
          cols="25"
          rows="4"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    { title: 'Localize PM', field: editableFields[2] },
    { title: 'Client Name', field: editableFields[3] },
    { title: "Client's PM", field: editableFields[4] },
    { title: 'Vendor Name', field: editableFields[5] },
    {
      title: 'Vendor MailId',
      field: editableFields[6],
      editComponent: props => (
        <textarea
          name="txtDescEd"
          cols="20"
          rows="2"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      )
    },
    {
      title: 'Nature of Work',
      field: editableFields[7],
      lookup: workTypes
    },
    { title: 'Language', field: editableFields[8] },
    { title: 'Word Count', field: editableFields[9], type: 'numeric' },
    { title: 'Cost for Vendor', field: editableFields[10], type: 'numeric' },
    {
      title: 'Currency',
      field: editableFields[11],
      lookup: currencyTypes
    },
    { title: 'CreatedBy', field: readableFields[1], editable: 'never' },
    {
      title: 'System CreatedOn',
      field: readableFields[2],
      type: 'datetime',
      editable: 'never'
    },
    {
      title: 'ModifiedOn',
      field: readableFields[3],
      type: 'datetime',
      editable: 'never'
    }
  ];
  if (isAdmin) {
    allColumns.splice(3, 0, {
      title: 'Payment Status',
      field: editableFields[12]
    });
  } else {
    allColumns.splice(13, 0, {
      title: 'Payment Status',
      field: editableFields[12],
      editable: 'never'
    });
  }
  return allColumns;
}
