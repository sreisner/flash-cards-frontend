import CreateDeckDialog from '../CreateDeckDialog';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import React from 'react';
import { TOGGLE_CREATE_DECK_DIALOG_MUTATION } from '../../lib/withData';

const ToggleCreateDeckDialogMutation = ({ children }) => (
  <>
    <Mutation mutation={TOGGLE_CREATE_DECK_DIALOG_MUTATION}>{children}</Mutation>
    <CreateDeckDialog />
  </>
);

ToggleCreateDeckDialogMutation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToggleCreateDeckDialogMutation;
