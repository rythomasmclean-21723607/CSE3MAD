/**
 * @file UserContent.tsx
 * @brief CSE3MAD-Assessment 1 Part 2
 *
 * @author Ry Thomas McLean (21723607)
 *
 * @copyright
 * Copyright (C) 2025  Ry Thomas McLean
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/

import React, { createContext, useContext } from 'react';

const accessDoor = true;

const userResponse = {
  profile: [
    {
      id: 42,
      username: "rfinch",
      firstname: "Rosella",
      lastname: "Finch",
      email: "54459345@students.ltu.edu.au",
      idnumber: "54450000",
      address: "123 Main Street",
      department: "Law",
      profileimageurl: "http://127.0.0.1:8081/profile-54459345.png",
      profileimageurlsmall: "http://127.0.0.1:8081/profileSmall-54459345.png",
      customfields: [
        { shortname: "user_type", value: "Student" },
        { shortname: "signature", value: "http://127.0.0.1:8081/signature-54459345.png" }
      ]
    }
  ]
};

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => (
  <UserContext.Provider value={userResponse}>
    {children}
  </UserContext.Provider>
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
