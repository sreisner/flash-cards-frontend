import { OPEN_UPDATE_CARD_DIALOG_MUTATION, SHOW_NOTIFICATION_MUTATION } from '../lib/withData';

import { CURRENT_USER_QUERY } from './User';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

const Toggle = styled(Dropdown.Toggle)`
  &::after {
    content: none;
  }
`;

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD_MUTATION($id: ID!) {
    deleteCard(id: $id) {
      message
    }
  }
`;

const FlashCardActions = ({ id, onLoading, onComplete }) => {
  const [openUpdateCardDialog] = useMutation(OPEN_UPDATE_CARD_DIALOG_MUTATION, {
    variables: { id },
  });
  const [showNotification] = useMutation(SHOW_NOTIFICATION_MUTATION);
  const [deleteCard, { loading }] = useMutation(DELETE_CARD_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const handleDeleteCard = async () => {
    try {
      onLoading();
      await deleteCard();
    } catch (error) {
      showNotification({
        variables: {
          headerText: `We goofed something up.`,
          bodyText: `We couldn't delete the card.`,
        },
      });
    } finally {
      onComplete();
    }
  };

  return (
    <Dropdown className="text-right pr-2">
      <Toggle split variant="link-secondary">
        <FontAwesomeIcon icon="ellipsis-v" />
      </Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={openUpdateCardDialog} disabled={loading}>
          <FontAwesomeIcon icon={['fad', 'pencil']} className="mr-3" />
          Edit Card
        </Dropdown.Item>
        <Dropdown.Item onClick={handleDeleteCard} disabled={loading}>
          <FontAwesomeIcon icon={['fad', 'trash']} className="mr-3" color="var(--red)" />
          Delete Card
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

FlashCardActions.propTypes = {
  id: PropTypes.string.isRequired,
  onLoading: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default FlashCardActions;
