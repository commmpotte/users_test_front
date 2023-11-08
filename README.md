# User Management Frontend

This is the frontend part of the User Management application built with React and Bootstrap.
Backend part is here: https://github.com/commmpotte/users_test_back

## Features

- User authentication and authorization.
- User list with sorting and searching capabilities.
- User details view and editing.
- Ability to mark users as active and superusers.

## User Roles and Functionality

### Admin Role

- The "admin" account has the following additional capabilities:
  - Mark users as "active" or "inactive."
  - Mark users as "superusers" or regular users.
  - Granting "is_active = false" status to a user prevents them from successful authorization. "is_active = true" allows authorization.
  - Only users with status "is_superuser = true" have an access to personal page and modify own details, including changing the username, password, first name, and last name.

### Regular User Role

- Regular users can view their own details but do not have access to change their data.
- Regular users cannot access the user management section or make any changes to other users' details.
- They can only log in if their "is_active" status is set to "true."

## Additional Notes

- The application implements role-based authorization. The "admin" account has full access to user details, including marking users as active and superusers. Regular users can only view their own details (username: `admin`; password: `admin`).
- The "is_active" and "is_superuser" statuses can be toggled for users using the provided switches.
- User data is sorted and searchable based on the selected criteria.
  
## Usage

1. Make sure you have the backend server running. You can find the backend code [here](https://github.com/commmpotte/users_test_back).

2. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/commmpotte/users_test_front.git
   ```

3. Install the required dependencies.

   ```bash
   npm install
   ```

4. Update the configuration in `src/config.js` with the appropriate backend API URL.

5. Run the development server.

   ```bash
   npm start
   ```

6. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

7. Use the following credentials to access the admin account:

   - Username: `admin`
   - Password: `admin`


