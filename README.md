# BlogAPI Lounge

## Overview

Welcome to BlogAPI Lounge. Built with  Express.js  and Mongoose, this API server provides you with fake BlogAPI data for API testing purposes. The server provides Blog data. BlogAPI Lounge provides a number of useful API calls to retrieve and modify data for api testing. Following are the links to the original JSON Data Files.

## API description

### <p align=center><ins>[Live Server Link](https://assignment-3-sigma-six.vercel.app/api/blogs)</ins></p>

The following API calls are available from the server

### Get Blogs By Query Parameters

This API call provides You with a collection of blogs   based on query parameter.

#### Retrieve Blogs By search Term

```http

https://assignment-3-sigma-six.vercel.api/blogs?search=blog


```

#### Sort By Fields and use Sort Order with author Filter

```http
https://assignment-3-sigma-six.vercel.app//blogs/?search=blog&sortBy=createdAt&sortOrder=desc&filter=6765cefec8b94824b2c035f5

```

#### Retrieves a blg based on id

```http
https://assignment-3-sigma-six.vercel.app/api/blogs/6765cefec8b94824b2c035f5
```

### Get a single blog

This API call requires The ID of the product as parameter and returns a single blog data .

```http
https://assignment-3-sigma-six.vercel.app/api/blogs/673fec437bd216ac4e1b8085
```

### Create a blog

This API call creates a blog in the database. This is a post request so the request document is required . If the document body is empty this API call returns an error message and the created document if the post operation was successful.

```http
https://assignment-3-sigma-six.vercel.app/api/blog/673fec437bd216ac4e1b8085
```

#### POST BODY

```json
{
      "title": "Freshly Created blog",
      "content":"Freshly Created Content"

}

```

### Update a blog's properties

This API call updates the data in the specified product. It takes the modified document or the updated document and modifies the field values of the document in the DB. If the prescribed document format is not provided the API returns an error message

```http
https://assignment-3-sigma-six.vercel.app/api/blogs/673fec437bd216ac4e1b8085
```

#### Request Body

```json
{
    "title":"Changed blog Again",
    "content":"Changed Content Again"
}
```

### Delete a blog

This API call deletes a specified product in the database. It returns a Delete confirmation in the form of success and error message.

```http
https://assignment-3-sigma-six.vercel.app/api/blogs/674011efe649fa028c41ff44

```

## Predefined POSTMAN Requests for your convenience

BlogAPI lounge is Pleased to provide you with all the predefined API calls in postman requests   so that you don't have to manually enter The URL in the browser in order to test the server. the postman requests are organized into several  collections. the public link for the POSTMAN Workspace is provided below.

[Predefined API Requests from POSTMAN](https://web.postman.co/workspace/University-~91545282-1487-4e28-98b3-37d488cce5d4/collection/8586956-f011be74-1c74-46ac-8017-ad65c5e2fd61)

## Data Sanitization

We implemented powerful Zod validation library to sanitize the post and get data, query and perimeters. If the POST data and GET query and parameter data format is correct, the server returns a success message and  the original data is preserved otherwise an error message is transmitted respectively. Bad data is no good.

## Middleware as the request Guard on alert

A number of middleware were implemented in the server to ensure data cleaning during the life cycle of a post request. For example, If there are no data available for the order or blog creation Request the middleware will not allow the post request to go through the next stage and will immediately return a response stating that a request body is required.

## The Last Mile

We are very eager to expand our server With more API calls in the near future along with standardizing our code base According to the industry conventions. With enough care and nurture our server will expand its functionalities in the near future and eventually bloom into a full fledged API testing platform.
