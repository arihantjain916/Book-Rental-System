const gql = require('graphql-tag')
module.exports = gql`
type Book {
    id: ID
    title: String!
    description: String!
    isbn: String!
    language: String!
    price: Float!
    rating: Float!
    noofbooksavailable: Int!
    author: Author!
    createdAt: String
}
type Author{
    id:ID
    name: String!
    email:String!
    books: [Book!]
    createdAt: String
}

type Rent {
  id: ID!
  rentername: String!
  renteremail: String!
  books: [BookRental!]!
}

type BookRental {
  book: Book!
  returndate: String!
  returned: Boolean!
  fine: Float!
  paid: Boolean!
}

type GetFine {
  rent: Rent!
  message: String!
}

type PayFine{
  rent: Book
  message: String
}



input BookInput {
    title: String!
    author: ID!
    description: String!
    isbn: String!
    language: String!
    price: Float!
    rating:Float
    noofbooksavailable: Int!
    # createdAt: String
}

input AuthorInput {
    name: String!
    email: String!
}

input RentInput {
  rentername: String!
  renteremail: String!
  books: [BookRentalInput!]!
}

input BookRentalInput {
  book: ID!
}

input ReturnBookInput{
    ID:ID
    bookId: ID!
}

type Query{
    books(ID:ID!): Book!
    getBook(amount: Int): [Book!]
    author(ID:ID!) : [Author!]
    getAuthor(amount: Int): [Author!]
    getRent(ID:ID!): [Rent!]
}

type Mutation{
    createBook(bookInput: BookInput!): Book!
    deleteBook(ID: ID!): Boolean
    editBook(ID:ID!, bookInput : BookInput): Boolean
    createAuthor(authorInput: AuthorInput!): Author!
    deleteAuthor(ID: ID!): Boolean
    editAuthor(ID:ID!, authorInput : AuthorInput): Boolean
    createRent(RentInput: RentInput!) : Rent
    deleteRent(ID:ID!): Boolean
    returnBook(ReturnBookInput: ReturnBookInput): Rent
    getfine(ID:ID!): GetFine
    payfine(ReturnBookInput:ReturnBookInput): PayFine
}
`