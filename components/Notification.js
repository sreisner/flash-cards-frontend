import { HIDE_NOTIFICATION_MUTATION, LOCAL_STATE_QUERY } from '../lib/withData';
import { Mutation, Query } from 'react-apollo';

import React from 'react';
import Toast from 'react-bootstrap/Toast';

const Notification = () => (
  <Mutation mutation={HIDE_NOTIFICATION_MUTATION}>
    {hideNotification => (
      <Query query={LOCAL_STATE_QUERY}>
        {({
          data: {
            notification: { isVisible, headerText, bodyText },
          },
        }) => (
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
        )}
      </Query>
    )}
  </Mutation>
);

export default Notification;
