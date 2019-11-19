import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';

const styles = {
    formControl: {
        margin: 5,
        minWidth: 120,
    },

};

function HigherOrderComponent(props) {
    const { classes, children } = props;
    return <FormControl className={classes.formControl}>{children}</FormControl>;
}

HigherOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HigherOrderComponent);
