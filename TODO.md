# TODO

- [x] Make UI work.
- [ ] Login page
    * Change login icon to button.
    * Add "Forgot password?" link.
- [ ] Signup page.
    * Send cookie and route to main page.
    * Add typing to the resolver in login.
    * Refactor login page to make GraphQL Yoga reusable.
- [ ] Adjust `find` function to return the type of passed field.
- [ ] Show global error if there is no data, or for server errors and bad requests.
- [ ] Focus browser location.
# optimization

- [ ] write rule for mui
- [ ] change pitch to facility
- [ ] set typing for the fields array in mongodb
- [ ] add next seo
- [ ] optimize query using dataloader https://vscode.dev/github/juffalow/express-graphql-example/blob/master/src/repositories/AuthorKnexRepository.ts
- [ ] add resolver and graphql types inside feature folder
- [ ] convert phone number component to use material ui
- [ ] refactor error handling to better way
- [ ] separate ui from logic
- [ ] create error e.g. createError("SignupError","message","errorCode")
- [ ] circle Choose location to search on
- [x] create hooks to update formik initial values. e.g. try to clean Filter component. ***SOLVED***: using enableReinitialize option in formik
- [ ] move geolocation to be in context to quickly get the state.
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
- update leaflet after rendering it
- create eslint rule to prevent developer from assigning types in graphql without importing it from its file
- change setField error in formik to take object of fields with its error instead of taking helper.setFieldError('email', result.data.signup.email); it should get helper.setError({email:result.data.signup.email,otherField:result.data.signup.otherField}) ** I found out there is such function called setErrors({})

### obstacle
Formik does not update the initial state coming from changing props. it should be done manually
### data loader

### graphql
