import React, { createContext, useContext, useReducer } from 'react';
import { Product, CartItem } from '../types';
import { useToast } from '../hooks/useToast';

interface ShopState {
  cart: CartItem[];
  favorites: Product[];
}

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_FAVORITE'; payload: Product };

const initialState: ShopState = {
  cart: [],
  favorites: [],
};

const shopReducer = (state: ShopState, action: ShopAction): ShopState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'TOGGLE_FAVORITE': {
      const isFavorite = state.favorites.some(item => item.id === action.payload.id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(item => item.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    default:
      return state;
  }
};

const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | null>(null);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);
  const { showToast } = useToast();

  const wrappedDispatch = (action: ShopAction) => {
    dispatch(action);
    
    switch (action.type) {
      case 'ADD_TO_CART':
        showToast('Added to cart successfully!', 'success');
        break;
      case 'REMOVE_FROM_CART':
        showToast('Removed from cart', 'info');
        break;
      case 'TOGGLE_FAVORITE':
        const isFavorite = state.favorites.some(item => item.id === action.payload.id);
        showToast(
          isFavorite ? 'Removed from favorites' : 'Added to favorites!',
          isFavorite ? 'info' : 'success'
        );
        break;
    }
  };

  return (
    <ShopContext.Provider value={{ state, dispatch: wrappedDispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};