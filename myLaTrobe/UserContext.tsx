
import React, { createContext, useContext } from 'react';

type CustomField = {
  shortname: string;
  value: string;
};

type UserProfile = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  idnumber: string;
  address: string;
  department: string;
  profileimageurl: string;
  profileimageurlsmall: string;
  customfields: CustomField[];
};

type UserContextType = {
  profile: UserProfile[];
};

const userResponse: UserContextType = {
  profile: [
    {
      id: 42,
      username: "jsmith",
      firstname: "John",
      lastname: "Smith",
      email: "john@example.com",
      idnumber: "S1234567",
      address: "123 Main Street",
      department: "Computer Science",
      profileimageurl: "https://yourmoodle.com/pluginfile.php/1234/user/icon/boost/f1",
      profileimageurlsmall: "https://yourmoodle.com/pluginfile.php/1234/user/icon/boost/f2",
      customfields: [
        {
          shortname: "user_type",
          value: "Teacher"
        }
      ]
    }
  ]
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UserContext.Provider value={userResponse}>
    {children}
  </UserContext.Provider>
);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
