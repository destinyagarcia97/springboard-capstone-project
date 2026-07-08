# CareCompass Frontend Specifications

## Project Name

**CareCompass**

## Tagline

**Navigate care with confidence.**

## Frontend Goal

The frontend of CareCompass will provide users with a simple, organized, and supportive experience for finding long-term care resources. The user should be able to search providers, view provider details, save favorites, leave reviews, and create a personalized care plan through the Care Journey Planner.

---

# Main User Flow

## 1. Homepage

The user lands on the homepage and sees:

* App name and tagline
* Short explanation of CareCompass
* Button to start Care Journey Planner
* Button to browse providers
* Navigation links for Login and Register

User options:

* Browse providers without logging in
* Register for an account
* Log in
* Start the Care Journey Planner

---

## 2. Register Page

A new user can create an account by entering:

* Name
* Email
* Password

After successful registration, the user is redirected to the dashboard.

---

## 3. Login Page

An existing user can log in using:

* Email
* Password

After successful login, the user is redirected to the dashboard.

---

## 4. Dashboard

The dashboard is the logged-in user’s main page.

The user can view:

* Saved providers
* Saved care plans
* Recommended next steps
* Quick links to browse providers or start a new care plan

---

## 5. Provider Search Page

The user can browse long-term care providers.

Provider search will include:

* Search by provider name
* Filter by provider type
* Filter by county/location
* Provider cards showing basic information

Each provider card will include:

* Provider name
* Service type
* Location
* Short description
* Button to view details
* Button to save provider

---

## 6. Provider Detail Page

When a user clicks a provider, they will see more detailed information.

Provider details may include:

* Provider name
* Service type
* Address
* Phone number
* Website
* Description
* Services offered
* Reviews and ratings

Logged-in users can:

* Save provider
* Remove provider from saved list
* Leave a review
* Add provider to a care plan

---

## 7. Care Journey Planner

The Care Journey Planner will ask the user simple questions about their care needs.

Example questions:

* What type of care are you looking for?
* What county or area are you searching in?
* Do you need home care?
* Do you need transportation?
* Are you looking for nursing home options?
* Are you helping yourself or a family member?

Based on the user’s answers, the app will generate recommended next steps.

Example recommended steps:

* Search for home care agencies
* Contact an MLTC plan
* Explore transportation providers
* Save providers to compare later
* Create a care plan

The user can save the results as a care plan.

---

## 8. Saved Providers Page

Logged-in users can view providers they saved.

The page will show:

* Saved provider cards
* Provider type
* Location
* Button to view details
* Button to remove from saved list

---

## 9. Care Plans Page

Logged-in users can view their saved care plans.

Each care plan may show:

* Care plan title
* Selected needs
* Recommended steps
* Saved providers
* Status

Possible statuses:

* Not Started
* In Progress
* Completed

---

## 10. Reviews

Logged-in users can leave reviews on provider detail pages.

Review form fields:

* Rating
* Comment

Reviews will display:

* User name
* Rating
* Comment
* Date created

---

# Frontend Components

## Layout Components

* Navbar
* Footer
* Main Layout
* Protected Route Wrapper

## Authentication Components

* Register Form
* Login Form
* Logout Button

## Provider Components

* Provider Card
* Provider List
* Provider Search Bar
* Provider Filter Panel
* Provider Detail Section

## Review Components

* Review Card
* Review List
* Review Form
* Rating Display

## Care Plan Components

* Care Journey Form
* Recommended Steps List
* Care Plan Card
* Care Plan Detail
* Status Badge

## Dashboard Components

* Saved Providers Preview
* Care Plans Preview
* Quick Action Buttons

---

# Pages / Routes

## Public Routes

* `/` — Homepage
* `/providers` — Browse/search providers
* `/providers/:id` — Provider details
* `/login` — Login page
* `/register` — Register page

## Protected Routes

* `/dashboard` — User dashboard
* `/saved-providers` — User saved providers
* `/care-journey` — Care Journey Planner
* `/care-plans` — User care plans
* `/care-plans/:id` — Care plan details

---

# Frontend Control Flow

1. User visits homepage.
2. User can browse providers or create an account.
3. If the user registers or logs in, authentication token is saved.
4. Logged-in user is redirected to dashboard.
5. User can search providers.
6. User clicks provider card to view details.
7. User can save provider or leave a review.
8. User can start Care Journey Planner.
9. User answers care-related questions.
10. App generates recommended next steps.
11. User saves recommendations as a care plan.
12. User can return to dashboard to view saved providers and care plans.

---

# Basic Flow Diagram

```text
Homepage
   |
   |-- Browse Providers
   |       |
   |       |-- Provider Search Page
   |               |
   |               |-- Provider Detail Page
   |                       |
   |                       |-- Save Provider
   |                       |-- Leave Review
   |
   |-- Register / Login
           |
           |-- Dashboard
                   |
                   |-- Saved Providers
                   |
                   |-- Care Journey Planner
                   |       |
                   |       |-- Recommended Steps
                   |       |
                   |       |-- Save Care Plan
                   |
                   |-- Care Plans
                           |
                           |-- Care Plan Details
```

---

# MVP Frontend Features

The minimum frontend features needed for the project are:

* Homepage
* Login and register pages
* Dashboard
* Provider search page
* Provider detail page
* Saved providers page
* Care Journey Planner
* Care plans page
* Review form and review display
* Responsive design

---

# Stretch Frontend Features

If time allows, I would like to add:

* Provider comparison page
* Map view
* Profile picture upload
* Admin dashboard
* Interactive care checklist
* More advanced filtering
* Better animations and loading states
