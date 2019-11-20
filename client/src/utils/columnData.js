import React from 'react'
import moment from 'moment'

export const workTypes = {
    1: 'Translation',
    2: 'Voice Over',
    3: 'Transcription',
    4: 'SRT Creation',
    5: 'Transcription + VTT',
    6: 'Translation Update',
    7: 'Voice Over Update',
    8: 'eLearning Integration'
}

export const currencyTypes = {
    1: 'USD',
    2: 'EURO',
    3: 'INR',
    4: 'GBP'
}

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
]

export const readableFields = [
    'poNumber',
    'createdBy',
    'systemCreateOn',
    'modifiedOn'
]

export const allColumns = [
    { title: 'PO Number', field: 'poNumber', editable: 'never' },
    {
        title: 'Create Date', field: editableFields[0], type: 'date',
        render: rowData => moment(rowData.createdOn).format('DD/MM/YYYY')
    },
    {
        title: 'Project Name', field: editableFields[1],
        editComponent: props => (
            <textarea name="txtDescEd" cols="25" rows="4" onChange={e => props.onChange(e.target.value)} />
        )
    },
    { title: 'Localize PM', field: editableFields[2] },
    { title: 'Client Name', field: editableFields[3] },
    { title: 'Client\'s PM', field: editableFields[4] },
    { title: 'Vendor Name', field: editableFields[5] },
    {
        title: 'Vendor MailId', field: editableFields[6],
        editComponent: props => (
            <textarea name="txtDescEd" cols="20" rows="2" onChange={e => props.onChange(e.target.value)} />
        )
    },
    {
        title: 'Nature of Work',
        field: editableFields[7],
        lookup: workTypes
    },
    { title: 'Language', field: editableFields[8] },
    { title: 'Word Count', field: editableFields[9], type: 'numeric' },
    { title: 'Cost for Vendor', field: editableFields[10] },
    {
        title: 'Currency',
        field: editableFields[11],
        lookup: currencyTypes
    },
    { title: 'Payment Status', field: editableFields[12] },
    { title: 'CreatedBy', field: 'createdBy', editable: 'never' },
    { title: 'System CreatedOn', field: 'systemCreatedOn', type: 'datetime', editable: 'never' },
    { title: 'ModifiedOn', field: 'modifiedOn', type: 'datetime', editable: 'never' },
]