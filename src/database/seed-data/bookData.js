const bookData = [
    // J.K. Rowling Books (author_id: '1')
    {
      title: "Harry Potter and the Philosopher's Stone",
      author_id: '1',
      image_url: 'https://media.harrypotterfanzone.com/philosophers-stone-movie-stills.jpg',
      description: 'The story of a young wizard who discovers his magical heritage.',
      publication_year: 1997,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author_id: '1',
      image_url: 'https://www.teesche.com/img/book/j_k_rowling_harry_potter_and_the_chamber_of_secrets.jpg',
      description: 'Harry returns to Hogwarts for his second year of magical education.',
      publication_year: 1998,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      author_id: '1',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibjrXcoOIjaPDPsuLcQ9sysR7I5iiphaa1g&s',
      description: 'Harry learns about his past and confronts new dangers.',
      publication_year: 1999,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Harry Potter and the Goblet of Fire',
      author_id: '1',
      image_url: 'https://image.tmdb.org/t/p/original/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg',
      description: 'Harry competes in a dangerous tournament between wizarding schools.',
      publication_year: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Harry Potter and the Order of Phoenix',
      author_id: '1',
      image_url: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p166014_p_v13_au.jpg',
      description: 'Harry faces both personal challenges and growing darkness.',
      publication_year: 2003,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // George R.R. Martin Books (author_id: '2')
    {
      title: 'A Game of Thrones',
      author_id: '2',
      image_url: 'https://i.harperapps.com/hcanz/covers/9780007459483/y648.jpg',
      description: 'The first book in the epic fantasy series A Song of Ice and Fire.',
      publication_year: 1996,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'A Clash of Kings',
      author_id: '2',
      image_url: 'https://i.harperapps.com/hcanz/covers/9780007459452/x293.jpg',
      description: 'Civil war erupts in the Seven Kingdoms.',
      publication_year: 1998,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'A Storm of Swords',
      author_id: '2',
      image_url: 'https://i.harperapps.com/hcanz/covers/9780007447855/y648.jpg',
      description: 'The Seven Kingdoms face both civil war and external threats.',
      publication_year: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'A Feast for Crows',
      author_id: '2',
      image_url: 'https://i.harperapps.com/hcanz/covers/9780007447862/x293.jpg',
      description: 'The war leaves the survivors to pick up the pieces.',
      publication_year: 2005,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'A Dance with Dragons',
      author_id: '2',
      image_url: 'https://i.harperapps.com/hcanz/covers/9780002247399/x293.jpg',
      description: 'Dragons return to a world in chaos.',
      publication_year: 2011,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // J.R.R. Tolkien Books (author_id: '3')
    {
      title: 'The Hobbit',
      author_id: '3',
      image_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Hobbit_-_The_Battle_of_the_Five_Armies.png/220px-The_Hobbit_-_The_Battle_of_the_Five_Armies.png',
      description: 'Bilbo Baggins goes on an unexpected journey.',
      publication_year: 1937,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Fellowship of the Ring',
      author_id: '3',
      image_url: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p28828_p_v8_ao.jpg',
      description: 'First part of The Lord of the Rings trilogy.',
      publication_year: 1954,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Two Towers',
      author_id: '3',
      image_url: 'https://tolkiengateway.net/w/images/thumb/7/79/The_Lord_of_the_Rings_-_The_Two_Towers_-_Original_Motion_Picture_Soundtrack.jpg/640px-The_Lord_of_the_Rings_-_The_Two_Towers_-_Original_Motion_Picture_Soundtrack.jpg',
      description: 'Second part of The Lord of the Rings trilogy.',
      publication_year: 1954,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Return of the King',
      author_id: '3',
      image_url: 'https://image.tmdb.org/t/p/original/uV4NEAkYNASLRuoNm7hDheC6VlZ.jpg',
      description: 'Final part of The Lord of the Rings trilogy.',
      publication_year: 1955,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Silmarillion',
      author_id: '3',
      image_url: 'https://tolkiengateway.net/w/images/3/3a/The_Silmarillion_1977.png',
      description: 'The ancient history of Middle-earth.',
      publication_year: 1977,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // Stephen King Books (author_id: '4')
    {
      title: 'The Shining',
      author_id: '4',
      image_url: 'https://image.tmdb.org/t/p/original/fFYAlrOudDJRYs8tvuHbUk0OGdL.jpg',
      description: 'A family becomes caretakers of an isolated hotel for the winter.',
      publication_year: 1977,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'It',
      author_id: '4',
      image_url: 'https://m.media-amazon.com/images/M/MV5BZGZmOTZjNzUtOTE4OS00OGM3LWJiNGEtZjk4Yzg2M2Q1YzYxXkEyXkFqcGc@._V1_.jpg',
      description: 'A group of friends battle an ancient evil in their hometown.',
      publication_year: 1986,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Stand',
      author_id: '4',
      image_url: 'https://cdn.kobo.com/book-images/af1757ed-1d7c-4f4d-ba58-93aaee8407bf/1200/1200/False/the-stand-1.jpg',
      description: 'Survivors of a pandemic face a battle between good and evil.',
      publication_year: 1978,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Pet Sematary',
      author_id: '4',
      image_url: 'https://m.media-amazon.com/images/M/MV5BNWQ0ZTQ2NTQtNGQ3MS00YTdlLThlOTAtZDBiZDkzNDk1MDk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      description: 'A family discovers a mysterious burial ground near their home.',
      publication_year: 1983,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Green Mile',
      author_id: '4',
      image_url: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_FMjpg_UX1000_.jpg',
      description: 'A death row supervisor encounters a mysterious inmate.',
      publication_year: 1996,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // Agatha Christie Books (author_id: '5')
    {
      title: 'Murder on the Orient Express',
      author_id: '5',
      image_url: 'https://m.media-amazon.com/images/M/MV5BNTlkYjBlZTctZjg2YS00NDMzLTlkMTMtNWExMGYyOTliMmEzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
      description: 'Detective Hercule Poirot investigates a murder on a trapped train.',
      publication_year: 1934,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Death on the Nile',
      author_id: '5',
      image_url: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fc888cbe7-9de7-4204-a8b8-23462fd8b212_1430x2560.jpeg',
      description: 'A murder mystery set on a cruise down the Nile.',
      publication_year: 1937,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'And Then There Were None',
      author_id: '5',
      image_url: 'https://m.media-amazon.com/images/I/81nChcVy7CL.jpg',
      description: 'Ten strangers are trapped on an island with a killer.',
      publication_year: 1939,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The ABC Murders',
      author_id: '5',
      image_url: 'https://m.media-amazon.com/images/M/MV5BMmZiMzMwNWMtOWFiYy00OWM5LWJlYjQtZmMyZTkwN2E1ZjFhXkEyXkFqcGc@._V1_.jpg',
      description: 'Poirot hunts a serial killer working through the alphabet.',
      publication_year: 1936,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Body in the Library',
      author_id: '5',
      image_url: 'https://m.media-amazon.com/images/I/81xEqM+sXcL._AC_UF1000,1000_QL80_.jpg',
      description: 'Miss Marple investigates a mysterious corpse.',
      publication_year: 1942,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // Dan Brown Books (author_id: '6')
    {
      title: 'The Da Vinci Code',
      author_id: '6',
      image_url: 'https://m.media-amazon.com/images/I/815WORuYMML._AC_UF1000,1000_QL80_.jpg',
      description: 'A mystery thriller involving hidden religious secrets.',
      publication_year: 2003,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Angels & Demons',
      author_id: '6',
      image_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1696691404i/960.jpg',
      description: 'Robert Langdon investigates a conspiracy within the Vatican.',
      publication_year: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Lost Symbol',
      author_id: '6',
      image_url: 'https://m.media-amazon.com/images/I/81BlXbpNmuL.jpg',
      description: 'A mystery set in Washington D.C. involving Freemasonry.',
      publication_year: 2009,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Inferno',
      author_id: '6',
      image_url: 'https://upload.wikimedia.org/wikipedia/en/6/66/Inferno_%282016_film%29.png',
      description: 'Langdon races to prevent a deadly plague release.',
      publication_year: 2013,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Origin',
      author_id: '6',
      image_url: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Origin_2023_film_poster.jpg',
      description: 'A thriller exploring humanitys origins and destiny.',
      publication_year: 2017,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // Paulo Coelho Books (author_id: '7')
    {
      title: 'The Alchemist',
      author_id: '7',
      image_url: 'https://m.media-amazon.com/images/I/81UGPuNl7kL._UF1000,1000_QL80_.jpg',
      description: 'A shepherd boy travels in search of a treasure.',
      publication_year: 1988,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Brida',
      author_id: '7',
      image_url: 'https://m.media-amazon.com/images/I/71Ka+-4TJUL._AC_UF1000,1000_QL80_.jpg',
      description: 'A young Irish girl learns about spirituality and magic.',
      publication_year: 1990,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'The Pilgrimage',
      author_id: '7',
      image_url: 'https://m.media-amazon.com/images/I/61R9iNMeMUL._AC_UF1000,1000_QL80_.jpg',
      description: 'A journey along the road to Santiago.',
      publication_year: 1987,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'By the River Piedra I Sat Down and Wept',
      author_id: '7',
      image_url: 'https://m.media-amazon.com/images/I/61e9vDayxBL.jpg',
      description: 'A story about love, miracles, and faith.',
      publication_year: 1994,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Eleven Minutes',
      author_id: '7',
      image_url: 'https://m.media-amazon.com/images/I/613XiFSat6L._AC_UF1000,1000_QL80_.jpg',
      description: 'A young Brazilian girls journey of self-discovery.',
      publication_year: 2003,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
    // Harper Lee Books (author_id: '8')
    {
      title: 'To Kill a Mockingbird',
      author_id: '8',
      image_url: 'https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg',
      description: 'A story of racial injustice and loss of innocence in the American South.',
      publication_year: 1960,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Go Set a Watchman',
      author_id: '8',
      image_url: 'https://m.media-amazon.com/images/I/91YXvPqn5jL.jpg',
      description: 'The sequel to To Kill a Mockingbird.',
      publication_year: 2015,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  module.exports = bookData