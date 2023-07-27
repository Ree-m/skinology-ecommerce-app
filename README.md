<a name="readme-top"></a>

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">


  <h3 align="center">Skinology Ecommerce App</h3>

  <p align="center">
    Welcome to Skinology, a fullstack ecommerce application.
    <br />
    <a href="https://github.com/Ree-m/skinology-ecommerce-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://skinology-ecommerce-app-client.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/Ree-m/skinology-ecommerce-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/Ree-m/skinology-ecommerce-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
       li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Skinology Ecommerce App][product-screenshot]](https://skinology-ecommerce-app-client.onrender.com/)
Skinology is a full-stack ecommerce web app with a React frontend and an Express/MongoDB backend. It uses JSON web tokens for authentication and is fully responsive for a seamless shopping experience on any device.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- Non-registered users can browse and search for products in the app, and add them to a guest cart.
- Registered users can log in to view and manage their persistent cart, including adding, deleting, and updating products.
- All users can easily search for products using the app's search function.
- The app includes two distinct interfaces: one for regular users and one for admin.
- Admin has full access to all the features of regular users, as well as the ability to add, edit, and delete products in the app.

### Optimizations

- Add pop up saying "item has been added to cart" and showing cart and contine shopping buttons.

- Adding loading states for each action.

- Improve local setup instructions

- Improve search bar in mobile

- Filter products by category and brand

- Give users the ability to delete their account and give admins the ability to delete any account.

### Built With

- [![Node][node.js]][node-url]
- [![React][react.js]][react-url]
- [![Express][express.js]][express-url]
- [![MongoDB][mongodb]][mongodb-url]
- [![JsonWebTokens][jwt]][jwt-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Live Demo

[Live Demo](https://skinology-ecommerce-app-client.onrender.com/)

### Admin Account

username: admin password: 12345678 email: admin@gmail.com

### Demo Account

username: test password: test email: test@gmail.com

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
- node

### Setup

Adding the config.env file in /config/.env.

```sh

DB_STRING=
PORT=
SECRET=
ALLOWED_ORIGIN=
API_DOMAIN=
SESSION_SECRET=
COOKIE_SECRET=

```

Adding the .env file in root of client folder.

```sh

VITE_REACT-APP_API_URL=

```

Install the dependencies and devdependencies.

```sh
  cd skinology-ecommerce-app

  cd client

  npm install

  cd ..

  cd api

  npm install

```

To start react server

```sh
cd client

npm run dev
```

To start node server

```sh
cd api

npm run start

```

<!-- USAGE EXAMPLES -->

## Usage

Users can signup here.
<img src="client/src/assets/signup-form.png" alt="Image of signup form" />

Users can login here.Try our demo account or sign in as an admin to explore all the features.
<img src="client/src/assets/login-form-screenshot.png" alt="Image of the login form" />

Registered users can add products to their cart, delete items, and update quantities as needed. The total price of all products int the cart is shown at the bottom of the cart page.

<img src="client/src/assets/skinology-cart.jpg" alt="Image of a users cart" />

Non-registered users can also utilize the following guest cart.

<img src="client/src/assets/skinology-guest-cart.jpg" alt="Image of a guest users cart" />

Clicking on a specific product leads to the product page, where detailed information such as the product name, brand, price, ingredient list, and usage instructions are provided.

<img src="client/src/assets/skinology-product-details-page.jpg" alt="Image of the products details page." />

The homepage includes a carousel showcasing the best products.
<img src="client/src/assets/best-section-screenshot.png" alt="Image of a section of the project" />

The homepage highlights 12 of the newest products in a grid layout.

<img src="client/src/assets/new-section-screenshot.png" alt="Image of the new products section" />

Users can easily search for products using the search bar located in the app's header. The search functionality allows users to search by brand name or product name, providing quick access to desired products.

<img src="client/src/assets/searchBar--screenshot.png" alt="Image of the search page" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Reem Bsrat - reembsrat@gmail.com

Project Link: [https://github.com/Ree-m/skinology-ecommerce-app](https://github.com/Ree-m/skinology-ecommerce-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Layout and Copy Inspiration](https://www.likeskincare.com/)
- [Product Images and Copy Inspiration](https://www.stylevana.com/en_US/)
- [Enhancing Images](https://letsenhance.io/)
- [Choose an Open Source License](https://choosealicense.com)
- [Img Shields](https://shields.io)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/Ree-m/skinology-ecommerce-app/blob/main/LICENSE.txt
[product-screenshot]: client/src/assets/project-main-screenshot.png
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[mongodb]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongodb-url]: https://www.mongodb.com/docs/atlas/
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[jwt]: https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink
[jwt-url]: https://jwt.io/
