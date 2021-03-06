# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#Genres
nonfiction = Genre.create(name: "Non-Fiction")
political = Genre.create(name: "Political")
graphic = Genre.create(name: "Graphic")
fiction = Genre.create(name: "Fiction")
travel = Genre.create(name: "Travel")
poetry = Genre.create(name: "Poetry")
horror = Genre.create(name: "Horror")
classic = Genre.create(name: "Classic Literature")
fantasy = Genre.create(name: "Fantasy")

#Authors
austen = Author.create(name: "Jane Austen")
bradbury = Author.create(name: "Ray Bradbury")
bukowski = Author.create(name: "Charles Bukowski")
dickens = Author.create(name: "Charles Dickens")
fscott = Author.create(name: "F. Scott Fitzgerald")
joyce = Author.create(name: "James Joyce")
kerouac = Author.create(name: "Jack Kerouac")
king = Author.create(name: "Stephen King")
lee = Author.create(name: "Harper Lee")
mill = Author.create(name: "John Stuart Mill")
morrison = Author.create(name: "Toni Morrison")
murakami = Author.create(name: "Haruki Murakami")
orwell = Author.create(name: "George Orwell")
palahniuk = Author.create(name: "Chuck Palahniuk")
rowling = Author.create(name: "J.K Rowling")
salinger = Author.create(name: "J.D Salinger")
steinbeck = Author.create(name: "John Steinbeck")
ta_nehisi = Author.create(name: "Ta-Nehisi Coates")
thi = Author.create(name: "Thi Bui")
tolkien = Author.create(name: "J. R. R. Tolkien")
tolstoy = Author.create(name: "Leo Tolstoy")
twain = Author.create(name: "Mark Twain")
vonnegut = Author.create(name: "Kurt Vonnegut")
woolf = Author.create(name: "Virgina Woolf")


#Books
Book.create(title: "Franny and Zooey", author: salinger, genre: fiction)
Book.create(title: "Great Expectations", author: dickens, genre: classic)
Book.create(title: "David Copperfield", author: dickens, genre: classic)
Book.create(title: "Oliver Twist", author: dickens, genre: classic)
Book.create(title: "A Tale of Two Cities", author: dickens, genre: classic)
Book.create(title: "Mrs Dalloway", author: woolf, genre: classic)
Book.create(title: "Three Guineas", author: woolf, genre: classic)
Book.create(title: "On the Road", author: kerouac, genre: classic)
Book.create(title: "Anna Karenina", author: tolstoy, genre: classic)
Book.create(title: "War and Peace", author: tolstoy, genre: classic)
Book.create(title: "Ulysses", author: joyce, genre: classic)
Book.create(title: "On Liberty", author: mill, genre: political)
Book.create(title: "Fahrenheit 451", author: bradbury, genre: political)
Book.create(title: "Harry Potter and the Philosopher's Stone", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Chamber of Secrets", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Prisoner of Azkaban", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Goblet of Fire", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Order of the Phoenix", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Half-Blood Prince", author: rowling, genre: fantasy)
Book.create(title: "Harry Potter and the Deathly Hallows", author: rowling, genre: fantasy)
Book.create(title: "The Hobbit", author: tolkien, genre: classic)
Book.create(title: "The Lord of the Rings", author: tolkien, genre: fantasy)
Book.create(title: "It", author: king, genre: horror)
Book.create(title: "The Shinning", author: king, genre: horror)
Book.create(title: "Carrie", author: king, genre: horror)
Book.create(title: "Cujo", author: king, genre: horror)
Book.create(title: "Pet Sematary", author: king, genre: horror)
Book.create(title: "The Stand", author: king, genre: fiction)
Book.create(title: "Pride and Prejudice", author: austen, genre: classic)
Book.create(title: "Emma", author: austen, genre: classic)
Book.create(title: "Sense and Sensibility", author: austen, genre: classic)
Book.create(title: "Breakfast of Champions", author: vonnegut, genre: fiction)
Book.create(title: "Cat's Cradle", author: vonnegut, genre: fiction)
Book.create(title: "Slaughterhouse-Five", author: vonnegut, genre: classic)
Book.create(title: "Beloved", author: morrison, genre: classic)
Book.create(title: "Adventures of Huckleberry Finn", author: twain, genre: classic)
Book.create(title: "The Catcher in the Rye", author: salinger, genre: classic)
Book.create(title: "To Kill a Mockingbird", author: lee, genre: classic)
Book.create(title: "Nineteen Eighty-Four", author: orwell, genre: classic)
Book.create(title: "Animal Farm", author: orwell, genre: political)
Book.create(title: "Choke", author: palahniuk, genre: fiction)
Book.create(title: "Fight Club", author: palahniuk, genre: fiction)
Book.create(title: "Invisible Monsters", author: palahniuk, genre: fiction)
Book.create(title: "The Great Gatsby", author: fscott, genre: fiction)
Book.create(title: "We Were Eight Years in Power", author: ta_nehisi, genre: political)
Book.create(title: "The Best We Could Do", author: thi, genre: graphic)
Book.create(title: "Kafka On The Shore", author: murakami, genre: fiction)
Book.create(title: "The Wind Up Bird Chronicle", author: murakami, genre: fiction)
Book.create(title: "What I Talk About When I Talk About Running", author: murakami, genre: nonfiction)
Book.create(title: "Hard-Boiled Wonderland at the End of the World", author: murakami, genre: fiction)
Book.create(title: "Norweigan Wood", author: murakami, genre: fiction)
Book.create(title: "Love Is A Dog From Hell", author: bukowski, genre: poetry)
Book.create(title: "Burning in Water, Drowning in Flame", author: bukowski, genre: poetry)
Book.create(title: "The Grapes of Wrath", author: steinbeck, genre: fiction)
Book.create(title: "East of Eden", author: steinbeck, genre: fiction)
Book.create(title: "Cannery Row", author: steinbeck, genre: fiction)
Book.create(title: "Tortilla Flat", author: steinbeck, genre: fiction)
Book.create(title: "Travels with Charley", author: steinbeck, genre: travel)
