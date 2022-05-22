import { SET_SHOP_DETAILS, } from '../constent';
export const shopDetailsAction = (objValues) => {
  return (
    {
      type: SET_SHOP_DETAILS,
      payload: objValues
    }
  )
};
