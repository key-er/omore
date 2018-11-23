# omore

### What is Omore?
A chat app that uses socket.io. It is based on app shell model. Where server renders the skeleton of the app and the content is dynamically rendered by client

#### Features

- A pregressive chat app
  - https - yes
  - service worker - yes
  - Manifest - yes


#### Application Flow Diagram

### Lessons Learned
- manifest depends on service server (specifically sw’s fetch has to be setup)
- sw file must reside in root else https://developers.google.com/web/fundamentals/primers/service-workers/
- sw can also delete cache by litening 'activate' event
- even if you are doing server side rendering the path should be set inn express (node) to be able to add scripts
- add the link tag for manifest <link rel="manifest" href="manifest.json"> in head of html (having it in body was not being seen by chrome’s dev tool didn’t see it)
