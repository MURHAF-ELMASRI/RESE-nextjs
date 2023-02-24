[x] make ui work
[ ] login page
[ ] send cookie and route to main page
[ ] add typing to the resolver in login
[ ] refactor login page to make graphql-yoga reusable
[ ] signup page
[ ] adjust find function to return the type of passed field
[ ] show global error if there no data - or for server errors and bad request

# optimization

[ ] write rule for mui
[ ] change pitch to facility
[ ] set typing for the fields array in mongodb
[ ] add next seo
[ ] optimize query using dataloader https://vscode.dev/github/juffalow/express-graphql-example/blob/master/src/repositories/AuthorKnexRepository.ts
[ ] add resolver and graphql types inside feature folder
# learned topics

- difference between plugin and extends in eslint
- get outer path in next using externalDir option
- add new color to theme both in js and ts
- mocking vs stubbing
- data loader and N+1 problem in graphql
- problem: codegen was not recognize graphql fils
  - solution: the files' path should be set where the codegen work
- problem: reading graphql files because nodejs read file does not work for webpack or next
  - use gql tag and exports the schema to use it in graphql-yoga

### data loader

### graphql
