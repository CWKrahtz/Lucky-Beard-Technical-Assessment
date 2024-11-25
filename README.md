# Project name: Lucky beard Tech launch program

For this project I was given the opportunity to build a three page blog site from the technology of my choice. The site will have a page to display all the articles on the blog, a page for viewing articles and a page for creating articles.

## Frontend (Tech stack)

### Overview

The application is a React project built with Create React App, using JavaScript and CSS for styling. It utilizes various libraries including TipTap for rich text editing, Axios for API calls, and React Router for navigation.

### Getting Started

#### Tools

The following tools are required for effectively running this project on your local machine:

- Node: 16.x or higher
- NPM: 8.x or higher
- React: 18.3.1
- Browser Image Compression: 2.0.2
- TipTap Editor: 2.10.2
- DOMPurify: 3.2.1
- Axios: 1.7.7

#### Local Setup

##### 1. Clone the Repository:

Run the following in the command-line to clone the project:

```bash
$ git clone <repository-url>
```

Open Software and select File | Open... from the menu. Select cloned directory and press Open button

This can also be achieved through Github and Github Desktop : See Here

##### 2. Navigate to the project via a terminal of your choice:

```bash
$ cd lb-frontend
```

##### 3. Restore the project locally

```bash
$ npm install
```

##### 4. Run the project locally

```bash
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend (Technology)

### Overview

The backend is built using Node.js with TypeScript, providing a RESTful API for the blog application.

### Getting Started

#### Tools

The following tools are required for effectively running this project on your local machine:

- Node.js: 16.x or higher
- NPM: 8.x or higher
- TypeScript: 4.x
- Express.js

#### Local Setup

##### 1. Navigate to the project via a terminal of your choice:

```bash
$ cd lb-backend
```

##### 2. Restore the project locally

```bash
$ npm install
```

##### 3. Run the project locally

```bash
$ npm run dev
```

### Contributing

#### Pull Requests

All changes made to the project are REQUIRED to go through a Pull request that needs to be reviewed and signed off on by at least one member.
The title of Pull requests should follow the following convention What was done: Short description eg. </br>
Refactor: Some amazing description
Refer to the following confluence document to understand pull requests:
Document

#### Commits

Writing clear and concise commit messages is crucial for understanding the changes made to your branch. Well-written commits provide a high-level overview of alterations and help both you and your team navigate and interpret the project's history. Clear commit messages facilitate effective communication and collaboration.

To ensure consistency in commit messages, the following structure is recommended:

```
type(scope): subject

message
```

eg.

```
fix(User): User Entity updated

Refactored the User Entity to include additional validation and fix bugs related to user data handling.
```

A tool such as Commitizen is recommended

#### TODO:

- Filter functionality on Article Page
- UI styling to be mobile friendly
