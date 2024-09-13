# Express Shopping List

For this exercise we will be building a simple JSON API application where we will store a shopping list. You should use an **array** to store your items in the shopping list.

Your application should have the following routes:

1. ***GET /items*** - this should render a list of shopping items.

Here is what a response looks like:

**[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**

1. ***POST /items*** - this route should accept JSON data and add it to the shopping list.

Here is what a sample request/response looks like:

**{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**

1. ***GET /items/:name*** - this route should display a single item’s name and price.

Here is what a sample response looks like:

**{“name”: “popsicle”, “price”: 1.45}**

1. ***PATCH /items/:name***, this route should modify a single item’s name and/or price.

Here is what a sample request/response looks like:

**{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**

1. ***DELETE /items/:name*** - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

**{message: “Deleted”}**

Please make use of the Express Router.