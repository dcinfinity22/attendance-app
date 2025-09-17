// Centralized navigation param lists for type safety

export type AuthStackParamList = {
  Login: undefined;
  Otp: { mobile: string; otp: string };
};

export type PreHomeStackParamList = {
  PaymentNotification: undefined;
  DailyUpdate: undefined;
};

export type AppTabParamList = {
  Notifications: undefined;
  Dashboard: undefined;
  Attendance: undefined;
  Leave: undefined;
  Meeting: undefined;
  EmpTracking: undefined;
  MasterEye: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  PreHome: undefined;
  App: undefined;
};
