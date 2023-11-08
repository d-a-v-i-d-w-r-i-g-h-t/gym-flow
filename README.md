![Static Badge](https://img.shields.io/badge/License-MIT-yellow)

  # Gym Flow

  ## Description

  Gym Flow is an application for keeping track, creating and sharing your workout routines with other users. A user can login or sign up on the website to gain access to creating and editing their own workout routines. An user can also go to a viewing page to view and save other user's workouts for their own use. The workouts can be created from scratch or use another individual's workout as inspiration to design the perfect routine for the user. Each workout can be shared by the author to allow others to view and potentially save it on their own account.


  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)

  ## Installation

  To install this project on your local machine, clone the repository to your local machine via your terminal. Once the repo has been cloned, run 'npm i' to install all of the needed dependencies. Once that is finished, create a file called '.env' and enter the following code:
  ```
  DB_NAME='museum_db'
  DB_USER=''
  DB_PASSWORD=''
  ```
  Enter your user name and password within that file in the empty spaces. After saving the file run the following in your terminal to have the initial data be seeded into the database:
  ```
  npm run seed
  ```
  Once the data has been seeded the user can then start the server. Each time your wish to start the server, simply run the following code in your terminal:
  ```
  npm start
  ```
  With the server up and running on your local machine you can then navigate to http://localhost:3001/ to visit the website that is being run from your local server.

  ## Usage

  To use this project, either navigate to (LINK TO BE INSERTED) for the officially deployed link, or if you installed the application on your own then navigate to http://localhost:3001/. From the home page, the user can see a carousel of other user's workouts on display as well as a short description of the website. From there the user can either sign in, sign up, or go straight to the discovery page. Should the user have an account and be logged in, the user gains access to a few more options. A user once logged in can create their own workout routines or edit the ones they have already created. The user has the power to edit or delete any of their workouts at any time. Should a user navigate to the discovery page, they can then scroll through all the other routines created by other individuals using the site. Any one of these workouts can be saved to later be edited or used. Should a user finish any editing or saving they can then logout for the day, and all of their workout routines will persist and be saved for the next loggin.

  ## Credits

  This project was designed by David Wright, Michael Reickerd and James Waller Jr. David's Github profile can be found [here](https://github.com/d-a-v-i-d-w-r-i-g-h-t), Michael's Github profile can be found [here](https://github.com/Migsrkrd), and James' Github profile can be found [here](https://github.com/DistantDig).

  ## License

  This project is covered under the ISC license. The full documentation on this license can be found [here](https://opensource.org/license/isc-license-txt/)

  ## Contributing

  Feel free to fork the project and create pull requests! Any ideas or contributions are welcome and appreciated!

  ## Tests

  No automatic methods of testing are included in this project, however feel free to fork the project and add some! Otherwise feel free to just experiment with the project and create issues for any odd behavior.