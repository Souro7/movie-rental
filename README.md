# Movie rental api
The movie rental company will use the api to store information about movies and borrowers, to browse and search for movies, etc. In order to store and retrieve information efficiently, we will store it in a mongo database.

**Project dependencies**
 - Framework: ExpressJS
	 - cors, joi
 - Database: MongoDB
 - ORM: mongoose


To add seed data: Run the following command

`mongoimport --db movie-rental --collection movies --file <path_to_file>/seedData.json --jsonArray`


**Data model schemas:**
 - Movie collection
	 - title: string
	 - genre: ref
	 - numberInStock: number
	 - dailyRentalRate: number
 - Genre collection
	 - name: string
 - Customer collection
	 - name: string
	 - isPremium: boolean
	 - phone: string
 - Rental collection
	 - customer: ref
	 - movie: ref
	 - dateIssued: date
	 - dateReturned: date
	 - rentalFee: number

**API specification**

 - Movies resource:
	 - To manage the entire collection of movies resource
	 - URI : /api/movies
		 - GET : to retrieve all movies
		 - POST : to add a new movie

 - Movie resource
	 - To manage a single movie resource
	 - URI: /api/movies/:movieId
		 - GET : to retrieve a movie
		 - PUT : to update details of a movie
		 - DELETE : to remove a movie

  - Genres resource:
	 - To manage the entire collection of genres resource
	 - URI : /api/genres
		 - GET : to retrieve all genres
		 - POST : to add a new genre

 - Genre resource
	 - To manage a single genre resource
	 - URI: /api/genres/:genreId
		 - GET : to retrieve a genre
		 - PUT : to update details of a genre
		 - DELETE : to remove a genre

- Customers resource:
	 - To manage the entire collection of customers resource
	 - URI : /api/customers
		 - GET : to retrieve all customers
		 - POST : to add a new customer

 - Customer resource
	 - To manage a single customer resource
	 - URI: /api/customers/:customerId
		 - GET : to retrieve a customer
		 - PUT : to update details of a customer
		 - DELETE : to remove a customer

- Rentals resource:
	 - To manage the entire collection of rentals resource
	 - URI : /api/rentals
		 - GET : to retrieve all rentals
		 - POST : to add a new rental
