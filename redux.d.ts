import "react-redux";
import "redux";
declare module "react-redux" {
  interface DefaultRootState extends DefaultRootState {
    pathwaysProgress: PathwayProgress[];
    questionResponses: UserResponse[];
    accountInfo: AccountInfo;
  }
}
declare module "redux" {
  interface Action<T = any> extends Action {
    questionResponses: UserResponse[];
    pathwaysProgress: PathwayProgress[];
    accountInfo: AccountInfo;
    type: string;
  }
}
