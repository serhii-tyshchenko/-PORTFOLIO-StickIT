import {
  ADD_STICKER,
  EDIT_STICKER,
  REMOVE_STICKER,
  TOGGLE_THEME,
  SIGN_IN
} from '../action-types';
import uuid from 'uuid/v1';
import db from '../../services/db/firebase';

const rootReducer = (state, action) => {
  switch (action.type) {
    case ADD_STICKER:
      const newSticker = {
        id: uuid(),
        title: '',
        text: '',
        color: '#fff',
        isPinned: false
      };
      db.addSticker(state.user.uid, newSticker);
      return {
        ...state,
        stickers: [newSticker, ...state.stickers]
      };

    case EDIT_STICKER:
      const { id, key, value } = action.payload;
      return {
        ...state,
        stickers: state.stickers.map(sticker => {
          if (sticker.id === id) {
            sticker[key] = value;
          }
          return sticker;
        })
      };

    case REMOVE_STICKER:
      return {
        ...state,
        stickers: state.stickers.filter(item => item.id !== action.payload)
      };

    case TOGGLE_THEME:
      return {
        ...state,
        theme: { ...state.theme, isLightTheme: !state.theme.isLightTheme }
      };

    case SIGN_IN:
      return {
        ...state,
        user: { ...action.payload.user, isLogged: true },
        stickers: action.payload.stickers
      };

    default:
      return state;
  }
};

export { rootReducer };