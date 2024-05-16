import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { TPushNotification } from '@/types/PushNotification';
import type { PayloadAction } from '@reduxjs/toolkit';

type PushNotificationsState = {
  notificationsList: TPushNotification[];
};

const initialState: PushNotificationsState = {
  notificationsList: [],
};

const pushNotificationsSlice = createSlice({
  name: 'pushNotifications',
  initialState,
  reducers: {
    pushNotificationAdded: {
      reducer: (
        state,
        { payload: notification }: PayloadAction<TPushNotification>,
      ) => {
        state.notificationsList.push(notification);
      },
      prepare: (notificationData: Omit<TPushNotification, '_id'>) => {
        return {
          payload: {
            _id: 'id',
            body: notificationData.body,
            type: notificationData.type,
            list: notificationData.list,
          },
        };
      },
    },
    pushNotificationRemoved: (
      state,
      { payload: id }: PayloadAction<string>,
    ) => {
      state.notificationsList = state.notificationsList.filter(
        (n) => n._id !== id,
      );
    },
    pushNotificationsListCleared: (state) => {
      state.notificationsList = [];
    },
  },
});

export const {
  pushNotificationAdded,
  pushNotificationRemoved,
  pushNotificationsListCleared,
} = pushNotificationsSlice.actions;

export default pushNotificationsSlice;

export const selectPushNotificationsList = (state: RootState) =>
  state.pushNotifications.notificationsList;

export const selectPushNotificationById = (id: string) => (state: RootState) =>
  state.pushNotifications.notificationsList.find((n) => n._id === id);
