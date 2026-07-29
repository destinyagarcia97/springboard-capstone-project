# CareCompass API Specifications

## Overview

CareCompass will use a RESTful API built with Node.js and Express. The API will allow the Next.js frontend to communicate with the MongoDB database.

The API will manage:

* User registration and authentication
* Long-term care providers
* Provider search and filtering
* Saved providers
* Provider reviews
* Personalized care plans
* Care Journey Planner recommendations

## Base URL

During local development:

```text
http://localhost:5000/api
```

After deployment:

```text
https://carecompass-api.onrender.com/api
```

The deployed URL is a planned example and may change.

---

# Authentication

Protected endpoints will require a valid JSON Web Token.

The client will send the token with protected requests:

```http
Authorization: Bearer <token>
```

Passwords will be hashed with bcrypt before being stored. The API will never return password hashes in its responses.

---

# Authentication Endpoints

## Register a User

```http
POST /api/auth/register
```

Creates a new user account.

### Access

Public

### Request Body

```json
{
  "name": "Taylor Smith",
  "email": "taylor@example.com",
  "password": "securePassword123"
}
```

### Successful Response

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Taylor Smith",
    "email": "taylor@example.com",
    "role": "user"
  }
}
```

### Possible Status Codes

* `201 Created`
* `400 Bad Request`
* `409 Conflict`
* `500 Internal Server Error`

---

## Log In

```http
POST /api/auth/login
```

Authenticates an existing user.

### Access

Public

### Request Body

```json
{
  "email": "taylor@example.com",
  "password": "securePassword123"
}
```

### Successful Response

```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "Taylor Smith",
    "email": "taylor@example.com",
    "role": "user"
  }
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `401 Unauthorized`
* `500 Internal Server Error`

---

## Get Current User

```http
GET /api/auth/me
```

Returns the profile of the currently authenticated user.

### Access

Protected

### Successful Response

```json
{
  "id": "user-id",
  "name": "Taylor Smith",
  "email": "taylor@example.com",
  "role": "user"
}
```

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `404 Not Found`

---

# Provider Endpoints

## Get All Providers

```http
GET /api/providers
```

Returns a list of providers.

### Access

Public

### Optional Query Parameters

```text
?search=community
?type=Home Care Agency
?county=Essex
?page=1
?limit=12
```

The parameters may be combined:

```text
/api/providers?type=Home%20Care%20Agency&county=Essex
```

### Successful Response

```json
{
  "providers": [
    {
      "id": "provider-id",
      "name": "Community Home Care Services",
      "providerType": "Home Care Agency",
      "county": "Essex",
      "address": {
        "city": "Newark",
        "state": "NJ"
      },
      "description": "A provider offering in-home support services."
    }
  ],
  "page": 1,
  "totalPages": 1,
  "totalProviders": 1
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `500 Internal Server Error`

---

## Get One Provider

```http
GET /api/providers/:providerId
```

Returns complete information for one provider.

### Access

Public

### Successful Response

```json
{
  "id": "provider-id",
  "name": "Community Home Care Services",
  "providerType": "Home Care Agency",
  "county": "Essex",
  "address": {
    "street": "100 Main Street",
    "city": "Newark",
    "state": "NJ",
    "zipCode": "07102"
  },
  "phone": "973-555-0100",
  "website": "https://example.com",
  "description": "A provider offering in-home support services.",
  "services": [
    "Personal Care",
    "Meal Preparation",
    "Companionship"
  ],
  "averageRating": 4.5,
  "reviewCount": 2
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `404 Not Found`
* `500 Internal Server Error`

---

## Create a Provider

```http
POST /api/providers
```

Adds a provider to the database.

### Access

Admin only

### Request Body

```json
{
  "name": "Community Home Care Services",
  "providerType": "Home Care Agency",
  "county": "Essex",
  "address": {
    "street": "100 Main Street",
    "city": "Newark",
    "state": "NJ",
    "zipCode": "07102"
  },
  "phone": "973-555-0100",
  "website": "https://example.com",
  "description": "A provider offering in-home support services.",
  "services": [
    "Personal Care",
    "Meal Preparation",
    "Companionship"
  ]
}
```

### Possible Status Codes

* `201 Created`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `409 Conflict`

---

## Update a Provider

```http
PUT /api/providers/:providerId
```

Updates an existing provider.

### Access

Admin only

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## Delete a Provider

```http
DELETE /api/providers/:providerId
```

Deletes an existing provider.

### Access

Admin only

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

Provider deletion will require special handling for connected reviews, user favorites, and care plans.

---

# Saved Provider Endpoints

## Get Saved Providers

```http
GET /api/users/me/saved-providers
```

Returns all providers saved by the authenticated user.

### Access

Protected

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `404 Not Found`

---

## Save a Provider

```http
POST /api/users/me/saved-providers/:providerId
```

Adds a provider to the authenticated user’s favorites.

### Access

Protected

### Successful Response

```json
{
  "message": "Provider saved successfully.",
  "savedProviders": [
    "provider-id"
  ]
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `401 Unauthorized`
* `404 Not Found`
* `409 Conflict`

---

## Remove a Saved Provider

```http
DELETE /api/users/me/saved-providers/:providerId
```

Removes a provider from the authenticated user’s favorites.

### Access

Protected

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `404 Not Found`

---

# Review Endpoints

## Get Reviews for a Provider

```http
GET /api/providers/:providerId/reviews
```

Returns reviews for a specific provider.

### Access

Public

### Successful Response

```json
{
  "reviews": [
    {
      "id": "review-id",
      "user": {
        "id": "user-id",
        "name": "Taylor Smith"
      },
      "rating": 5,
      "comment": "The staff was helpful and responsive.",
      "createdAt": "2026-07-20T14:00:00.000Z"
    }
  ],
  "averageRating": 5,
  "reviewCount": 1
}
```

### Possible Status Codes

* `200 OK`
* `404 Not Found`
* `500 Internal Server Error`

---

## Create a Review

```http
POST /api/providers/:providerId/reviews
```

Creates a review for a provider.

### Access

Protected

### Request Body

```json
{
  "rating": 5,
  "comment": "The staff was helpful and responsive."
}
```

A user will only be allowed to submit one review per provider.

### Possible Status Codes

* `201 Created`
* `400 Bad Request`
* `401 Unauthorized`
* `404 Not Found`
* `409 Conflict`

---

## Update a Review

```http
PUT /api/reviews/:reviewId
```

Updates a review.

### Access

Protected; review owner only

### Request Body

```json
{
  "rating": 4,
  "comment": "The overall experience was positive."
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## Delete a Review

```http
DELETE /api/reviews/:reviewId
```

Deletes a review.

### Access

Protected; review owner or administrator

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

# Care Journey Endpoint

## Generate Care Recommendations

```http
POST /api/care-journey/recommendations
```

Accepts the user’s Care Journey Planner responses and returns recommended next steps.

### Access

Public for generating recommendations

Saving the results as a care plan will require authentication.

### Request Body

```json
{
  "careFor": "Family Member",
  "county": "Essex",
  "state": "NJ",
  "selectedNeeds": [
    "Home Care",
    "Transportation"
  ]
}
```

### Successful Response

```json
{
  "recommendedSteps": [
    {
      "step": "Search for home care agencies in your area.",
      "category": "Home Care"
    },
    {
      "step": "Review available transportation services.",
      "category": "Transportation"
    },
    {
      "step": "Save providers that you would like to compare.",
      "category": "Planning"
    }
  ],
  "matchingProviderTypes": [
    "Home Care Agency",
    "Transportation Service"
  ]
}
```

### Recommendation Logic

The first version will use rule-based logic rather than artificial intelligence.

For example:

* If the user selects `Home Care`, recommend home care agencies.
* If the user selects `Transportation`, recommend transportation providers.
* If the user selects `Managed Long-Term Care`, recommend reviewing MLTC plans.
* If the user selects `Nursing Home Care`, recommend nursing home providers.

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `500 Internal Server Error`

---

# Care Plan Endpoints

## Get All Care Plans

```http
GET /api/care-plans
```

Returns all care plans owned by the authenticated user.

### Access

Protected

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`

---

## Get One Care Plan

```http
GET /api/care-plans/:carePlanId
```

Returns one care plan.

### Access

Protected; care plan owner only

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## Create a Care Plan

```http
POST /api/care-plans
```

Saves the results of the Care Journey Planner as a new care plan.

### Access

Protected

### Request Body

```json
{
  "title": "Care Plan for My Grandmother",
  "careFor": "Family Member",
  "selectedNeeds": [
    "Home Care",
    "Transportation"
  ],
  "location": {
    "county": "Essex",
    "state": "NJ"
  },
  "recommendedSteps": [
    {
      "step": "Search for home care agencies in your area.",
      "status": "Not Started"
    },
    {
      "step": "Review available transportation services.",
      "status": "Not Started"
    }
  ],
  "savedProviders": [],
  "notes": ""
}
```

### Possible Status Codes

* `201 Created`
* `400 Bad Request`
* `401 Unauthorized`

---

## Update a Care Plan

```http
PUT /api/care-plans/:carePlanId
```

Updates the title, selected needs, providers, notes, or recommended-step statuses.

### Access

Protected; care plan owner only

### Request Body Example

```json
{
  "notes": "Call providers on Monday.",
  "recommendedSteps": [
    {
      "step": "Search for home care agencies in your area.",
      "status": "Completed"
    },
    {
      "step": "Review available transportation services.",
      "status": "In Progress"
    }
  ]
}
```

### Possible Status Codes

* `200 OK`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## Add a Provider to a Care Plan

```http
POST /api/care-plans/:carePlanId/providers/:providerId
```

Adds an existing provider to a care plan.

### Access

Protected; care plan owner only

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`
* `409 Conflict`

---

## Remove a Provider from a Care Plan

```http
DELETE /api/care-plans/:carePlanId/providers/:providerId
```

Removes a provider from a care plan.

### Access

Protected; care plan owner only

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## Delete a Care Plan

```http
DELETE /api/care-plans/:carePlanId
```

Deletes a care plan.

### Access

Protected; care plan owner only

### Possible Status Codes

* `200 OK`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

# Standard Error Response

The API will use a consistent error format:

```json
{
  "error": {
    "message": "Provider not found.",
    "status": 404
  }
}
```

Validation errors may include additional details:

```json
{
  "error": {
    "message": "Validation failed.",
    "status": 400,
    "details": {
      "rating": "Rating must be between 1 and 5."
    }
  }
}
```

---

# Endpoint Summary

| Method | Endpoint                                            | Purpose                   | Access      |
| ------ | --------------------------------------------------- | ------------------------- | ----------- |
| POST   | `/api/auth/register`                                | Register user             | Public      |
| POST   | `/api/auth/login`                                   | Log in user               | Public      |
| GET    | `/api/auth/me`                                      | Get current user          | Protected   |
| GET    | `/api/providers`                                    | Search and list providers | Public      |
| GET    | `/api/providers/:providerId`                        | View provider details     | Public      |
| POST   | `/api/providers`                                    | Create provider           | Admin       |
| PUT    | `/api/providers/:providerId`                        | Update provider           | Admin       |
| DELETE | `/api/providers/:providerId`                        | Delete provider           | Admin       |
| GET    | `/api/users/me/saved-providers`                     | View favorites            | Protected   |
| POST   | `/api/users/me/saved-providers/:providerId`         | Save provider             | Protected   |
| DELETE | `/api/users/me/saved-providers/:providerId`         | Remove favorite           | Protected   |
| GET    | `/api/providers/:providerId/reviews`                | View provider reviews     | Public      |
| POST   | `/api/providers/:providerId/reviews`                | Create review             | Protected   |
| PUT    | `/api/reviews/:reviewId`                            | Update review             | Owner       |
| DELETE | `/api/reviews/:reviewId`                            | Delete review             | Owner/Admin |
| POST   | `/api/care-journey/recommendations`                 | Generate recommendations  | Public      |
| GET    | `/api/care-plans`                                   | View user care plans      | Protected   |
| GET    | `/api/care-plans/:carePlanId`                       | View one care plan        | Owner       |
| POST   | `/api/care-plans`                                   | Create care plan          | Protected   |
| PUT    | `/api/care-plans/:carePlanId`                       | Update care plan          | Owner       |
| DELETE | `/api/care-plans/:carePlanId`                       | Delete care plan          | Owner       |
| POST   | `/api/care-plans/:carePlanId/providers/:providerId` | Add provider to plan      | Owner       |
| DELETE | `/api/care-plans/:carePlanId/providers/:providerId` | Remove provider from plan | Owner       |

---

# Minimum API Scope

The required API functionality for the first complete version will include:

* Authentication
* View and search providers
* View individual providers
* Save and remove favorite providers
* Create and view reviews
* Generate Care Journey recommendations
* Create, view, update, and delete care plans

Admin provider management and advanced features may be completed after the core user experience is working.

---

# Possible API Challenges

## Authorization

The API must verify that users can only modify their own reviews and care plans.

## Filtering

Search terms, provider types, and locations must be handled consistently so provider filters return accurate results.

## Duplicate Records

The API should prevent duplicate email addresses, repeated saved providers, duplicate reviews, and repeated providers within care plans.

## Related Data

Deleting a provider may affect reviews, saved-provider lists, and care plans. The application will need a clear strategy for cleaning up or preserving related records.

## Recommendation Logic

Care Journey recommendations must remain understandable and predictable. The first version will use a small set of clearly defined rules that can be expanded later.

## Error Handling

The API should return helpful and consistent error messages when validation fails, records are missing, or users do not have permission to complete an action.

---

# Future API Enhancements

Possible future endpoints may support:

* Provider comparisons
* Map and location searches
* User profile images
* Email notifications
* Shared family care plans
* Provider verification
* Administrative reporting
* More advanced recommendation logic

```
```
