import CreateCardDialog from '../CreateCardDialog';
import { Mutation } from 'react-apollo';
import { OPEN_CREATE_CARD_DIALOG_MUTATION } from '../../lib/withData';
import PropTypes from 'prop-types';
import React from 'react';

const OpenCreateCardDialogMutation = ({ children }) => (
  <>
    <Mutation mutation={OPEN_CREATE_CARD_DIALOG_MUTATION}>{children}</Mutation>
    <CreateCardDialog />
  </>
);

OpenCreateCardDialogMutation.propTypes = {
  children: PropTypes.func.isRequired,
};

export default OpenCreateCardDialogMutation;
