# BACK TO YOU — Campus Lost & Found

**Every lost thing deserves a way home.**

BACK TO YOU is a responsive, frontend-only Lost & Found website designed for college campuses. It helps students report lost belongings, list items they have found, browse available listings, and submit demo claim requests to help reunite belongings with their owners.

The project is built using HTML, CSS, and vanilla JavaScript, with a focus on responsive design, usability, and interactive frontend functionality.

## Features

- **Responsive Design:** Works across mobile phones, tablets, and desktop screens.
- **Lost & Found Listings:** Browse reported lost and found items with photographs and descriptions.
- **Search and Filters:** Find items using keywords, categories, locations, and item status.
- **Item Details:** View additional information about individual listings.
- **Report an Item:** Submit demo reports for lost or found belongings.
- **Image Preview:** Preview an item photograph before submitting a report.
- **Demo Claim Workflow:** Submit a claim request with identifying details.
- **Interactive UI:** Dynamic listings, form validation, modals, and status messages.
- **Local Storage:** Optionally retain demonstration listings and statuses across browser sessions.
- **Safety Guidance:** Encourages responsible reporting and ownership verification.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage (for optional local demo persistence)

## Project Structure

```text
BACK-TO-YOU/
├── index.html
├── style.css
├── script.js
└── README.md
```

An optional `assets/` folder may be used for images and other static resources.

## Getting Started

### Prerequisites

- A modern web browser.
- Visual Studio Code (recommended).
- The Live Server extension for VS Code (optional).

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```

2. Open the project folder in Visual Studio Code.

3. Open `index.html` using Live Server, or open the file directly in your browser.

4. Explore the listings, try the search and filters, submit a demo report, and test the claim workflow.

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your actual GitHub username and repository name.

## How It Works

1. **Report:** Students submit a report for an item they have lost or found.
2. **Discover:** Users browse listings and filter them by relevant details.
3. **Claim:** A user submits a demonstration claim for a found item.
4. **Return:** The prototype illustrates how a claim and return workflow could operate in a real application.

## Project Limitations

BACK TO YOU is a frontend-only prototype.

- It does not have a backend server or shared database.
- Listings and statuses stored in Local Storage are limited to the current browser and device.
- Authentication and user identity verification are not implemented as secure production features.
- Claim submissions are demonstrations and do not establish ownership.
- There is no real-time communication between students or college administrators.

A future version could use the MERN stack — MongoDB, Express.js, React.js, and Node.js — to implement secure authentication, persistent shared data, image hosting, claim management, and administrative controls.

## Future Improvements

- College email verification and secure authentication.
- Shared database for campus-wide listings.
- Secure claim review and ownership verification.
- Admin dashboard for managing reports and returned items.
- Notifications for claim status updates.
- Image similarity matching for potentially related lost and found reports.
- Deployment for use by a real college community.

## Purpose

This project explores how a simple, accessible web application can help college communities manage lost belongings more conveniently. It also demonstrates frontend development skills, responsive UI design, DOM manipulation, form validation, and browser-based data persistence.

## License

This project is available for educational and personal portfolio purposes. Add a license file if you intend to specify formal reuse and distribution permissions.
