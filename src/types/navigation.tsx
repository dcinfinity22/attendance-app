import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Otp: { mobile: string;
    otp: string; };
  DailyUpdate: undefined;
  PaymentLeave: undefined;
  HomeTabs: undefined;
};

// Typed screen props for each screen
export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;
export type OtpScreenProps = NativeStackScreenProps<RootStackParamList, "Otp">;
export type DailyUpdateScreenProps = NativeStackScreenProps<RootStackParamList, "DailyUpdate">;
export type PaymentLeaveScreenProps = NativeStackScreenProps<RootStackParamList, "PaymentLeave">;
export type HomeTabsProps = NativeStackScreenProps<RootStackParamList, "HomeTabs">;
