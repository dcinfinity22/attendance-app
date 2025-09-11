// src/types.ts

export type RootStackParamList = {
  Login: undefined;
  Otp: { mobile: string };
  NotifyHello: { name: string };
  NotifyToday: undefined;
  HomeDrawer: undefined;
};

export type RootDrawerParamList = {
  HomeTabs: undefined;
  Notifications: undefined;
};

export type RootTabParamList = {
  ToDo: undefined;
  Updates: undefined;
  Support: undefined;
  Profile: undefined;
  History: undefined;
};
