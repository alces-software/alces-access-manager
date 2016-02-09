# Alces Flight

## Development server

Aviator also requires Bellman to be running for pub/sub-ing; set this up by running the following while connected to the Office VPN:

1. `git clone http://dev.dmz.alces-software.com/gitlab/bellman.git`

2. `npm install`

Then run the following from the Bellman directory:

1. `DATABASE_URL=postgres://$USER@localhost/$DATABASE ./node_modules/coffee-script/bin/coffee app.coffee`,

where `$DATABASE` is any psql database that exists, e.g. `exodus`, and `$USER` is a user with access to that database, e.g. `exodus-user` (this is not actually used for Flight, just required for Bellman to start as it is expecting this for Portal pub/sub).

To run the Aviator development server for the first time:

1. `npm run docker-bootstrap`

To run the development server on subsequent occasions:

1. `npm run docker-dev-server`

To install the latest dependencies when these change:

1. `./scripts/docker-run npm install`

If the above fails:

1. Check `npm-shrinkwrap.json` has been updated and pushed, then try again;
2. running `npm run docker-bootstrap` will rebuild the container and reinstall everything fixing some transitive dependency errors along the way.

Note `./scripts/docker-run` can be used to run arbitrary commands on the container, so `./scripts/docker-run bash` can be used to log in to the container to help diagnose issues.


## Architecture

### React components, dumb components, pages and containers

We use React components in a number of different ways, each fullfilling some particular purpose for rendering the end result.  We can consider these purposes as falling into three different areas:

 - dumb components
 - pages
 - containers

**Dumb components**, are provided with some properties to render, and perhaps some functions to connect user interactions to.  They provide mechanism for rendering those properites, but do not provide any business logic for why those properties were selected, nor any knowledge of how they were selected.

**Pages** are responsible for organizing sub-components, giving the page its basic structural layout.  That is, it imports things like `comopnents/PageHeader` and `components/SubComponentA` and "arranges them on the page".

It may have various lifecycle methods such as `ComponentDidMount`.  It will probably be stateless, as any state should live in the "container" component.

**Page containers** are responsible for fetching data; setting up page-specific functions (e.g., changing the store state).

They import the "page" they need to render and connect it to the redux store and export the connected component.  In other words "page containers" have no render fuction.

Typically, a page container will delegate the fetching of the data to a "selector" or it may combine several selectors.


#### Clusters list page example

Perhaps the clearest way to explain this would be with an example. Consider rendering the "Your clusters" page.  It displays all of a users clusters in a table.

We have three React components for displaying this page: `ClustersTable`, `ClustersPage`, and `ClustersPageContainer`, along with some helper functions in the form of "selectors" and action creators.

Each React component has a small, well-defined responsibility, which is distinct to the others.

**`ClustersTable`**

 - Displays a given list of clusters; connects user interactions to call given functions.
 - Does not provide any policy for which list of clusters is to be displayed, or how to obtain that list.
 - Does not have any knowledge of **how** to change the store in response to user interactions.  Though it does knows which given function to call.

**`ClustersPage`**

 - Responsible for the layout of a ClustersTable in a page with a page header.

**`ClustersPageContainer`**

 - Provides policy for which clusters should be displayed.
 - Connects `ClustersPage` to redux store using `clustersSelector` to obtain the clusters and various cluster actions to update it.
 - Is not responsible for displaying the list of clusters; that is delegated to ClustersTable via ClustersPage.
 - Is not responsible for the page layout; that is delegated to ClustersPage.

The advantage of this decomposition is that both `ClustersTable` and `ClustersPage` are easily reused.  This is particularly useful for `ClustersTable`, as we will want to display the running clusters for a given environment, and perhaps eventually the running clusters for a given user in a given environment.

These are both made easier by having `ClustersTable` provide only the mechanism for displaying a list of clusters and none of the policy of what is to be displayed.

The end result of this is the `ClustersPageContainer` which has the following properties:

 - it encapsulates the business logic of which clusters are to be displayed.
 - it encapsulates how to obtain those clusters.
 - it encapsulates how to update the store.
 - it encapsulates how to render those clusters.
 - it encapsulates how to connect user interactions to store updates.
 - it encapsulates how to layout the list into a page.

In short, in just render it and it'll figure out what to do.  This is the level of abstraction that we want for the components that are rendered by the router.
