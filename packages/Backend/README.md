### Firebase Setup
 - Login with firebase by running
 ```sh
 yarn firebase-login
 ```
 - Change the project name in example.firebaserc to match your project name and rename the file to .firebaserc

### Develop
Run webpack in a watch
```sh
yarn build --watch
```
Run
```sh
yarn start
```
to serve cloud functions on localhost

### Deploy
Run
```sh
yarn deploy
```
to deploy to your Firebase project
