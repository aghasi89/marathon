import React from 'react';

const UnreadMessageContext = React.createContext({
  unreadCount: 0,
  resetUnreadCount: () => {},
});

export default UnreadMessageContext;
