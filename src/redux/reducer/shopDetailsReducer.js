import { SET_SHOP_DETAILS } from "../constent";

const initialState = {
  currency: "",
  free_trial_expire: null,
  id: "",
  money_format: "",
  plan_name: "",
  shop: "",
  shop_owner: "",
  store_email: "",
  store_name: "",
  timezone: "",
  token: "",
};

export default function shopDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOP_DETAILS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
