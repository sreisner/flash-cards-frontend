import { HIDE_NOTIFICATION_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import { useMutation, useQuery } from '@apollo/react-hooks';

import React from 'react';
import Toast from 'react-bootstrap/Toast';

const Notification = () => {
  const [hideNotification] = useMutation(HIDE_NOTIFICATION_MUTATION);
  const {
    data: { notification },
  } = useQuery(LOCAL_STATE_QUERY);
  const { isVisible, headerText, bodyText } = notification || {};

  return (
    <Toast
      onClose={hideNotification}
      show={isVisible}
      delay={5000}
      autohide
      style={{ position: 'fixed', bottom: 20, right: 20 }}
    >
      <Toast.Header>
        <strong className="mr-auto">{headerText}</strong>
      </Toast.Header>
      <Toast.Body>{bodyText}</Toast.Body>
    </Toast>
  );
};

export default Notification;
