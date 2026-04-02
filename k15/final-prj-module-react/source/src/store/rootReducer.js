import authReducer from "@/features/auth/authSlice";
import profileReducer from "@/features/profile/profileSlice";
import uiReducer from "@/features/ui/uiSlice";
import postReducer from "@/features/post/postSlice";

const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  ui: uiReducer,
  post: postReducer,
};

export default rootReducer;
