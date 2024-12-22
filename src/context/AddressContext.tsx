import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Address } from '../types/address';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';

interface AddressState {
  addresses: Address[];
}

type AddressAction =
  | { type: 'ADD_ADDRESS'; payload: Address }
  | { type: 'REMOVE_ADDRESS'; payload: string }
  | { type: 'SET_DEFAULT'; payload: string }
  | { type: 'UPDATE_ADDRESS'; payload: Address };

const initialState: AddressState = {
  addresses: [],
};

const addressReducer = (state: AddressState, action: AddressAction): AddressState => {
  switch (action.type) {
    case 'ADD_ADDRESS':
      return {
        addresses: [...state.addresses, action.payload],
      };
    case 'REMOVE_ADDRESS':
      return {
        addresses: state.addresses.filter(addr => addr.id !== action.payload),
      };
    case 'SET_DEFAULT':
      return {
        addresses: state.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === action.payload,
        })),
      };
    case 'UPDATE_ADDRESS':
      return {
        addresses: state.addresses.map(addr =>
          addr.id === action.payload.id ? action.payload : addr
        ),
      };
    default:
      return state;
  }
};

interface AddressContextType extends AddressState {
  addAddress: (address: Omit<Address, 'id' | 'userId'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateAddress: (address: Address) => void;
}

export const AddressContext = createContext<AddressContextType | null>(null);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);
  const { showToast } = useToast();
  const { user } = useAuth();

  const addAddress = useCallback((address: Omit<Address, 'id' | 'userId'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...address,
      id: crypto.randomUUID(),
      userId: user.id,
      isDefault: state.addresses.length === 0,
    };
    dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
    showToast('Address added successfully!', 'success');
  }, [user, state.addresses.length, showToast]);

  const removeAddress = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ADDRESS', payload: id });
    showToast('Address removed successfully!', 'success');
  }, [showToast]);

  const setDefaultAddress = useCallback((id: string) => {
    dispatch({ type: 'SET_DEFAULT', payload: id });
    showToast('Default address updated!', 'success');
  }, [showToast]);

  const updateAddress = useCallback((address: Address) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: address });
    showToast('Address updated successfully!', 'success');
  }, [showToast]);

  return (
    <AddressContext.Provider value={{
      ...state,
      addAddress,
      removeAddress,
      setDefaultAddress,
      updateAddress,
    }}>
      {children}
    </AddressContext.Provider>
  );
};