'use client';
import { useContext, useReducer } from 'react';
import { SidebarProvider } from '../context/sidebar.context';
// import { AuthProvider } from "../context/auth.context";
import { ItemsProvider } from '../context/items.context';
import { AuthRolesProvider } from '../context/AuthRolesContext';
import { RoleContextProvider } from '../context/UserRoleContext';
import { AuthProvider } from '../context/AuthContext';
import { LocationsProvider } from '../context/LocationsContext';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'

// const queryClient = new QueryClient()
const ContextWrapper = ({ children }) => {
  return (
    <>
      <RoleContextProvider>
        <AuthRolesProvider>
          <AuthProvider>
            <SidebarProvider>
              <ItemsProvider>
                <LocationsProvider>{children}</LocationsProvider>
              </ItemsProvider>
            </SidebarProvider>
          </AuthProvider>
        </AuthRolesProvider>
      </RoleContextProvider>
    </>
  );
};
export default ContextWrapper;
