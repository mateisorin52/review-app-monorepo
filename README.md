# MeroAssignmentMonorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Understand this workspace

- The workspace consists of 2 apps
-- REST api (NestJS) - api
-- Mobile app (React Native) - mobile-app

## Running the apps
* while in mero-assignment-monorepo run 'npm install' (node_modules are global)

- api - run 'npx nx serve api' ( a .env with DATABASE_URL='conn_string' needs to be created )

- mobile-app - run 'npx nx run-android/run-ios mobile-app' ( the mobile app is currently coonected to the deployed api (https://review-app.evoware-software.ro) )

## Miscellaneous
- CI directory -> build_and_deploy.sh -> builds the docker image, tags it and pushes it to dockerhub
- k8s -> manifests for deploying the api to GKE