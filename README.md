This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, switch to npm version 6.14.15, then install dependencies:
```bash
npm install -g npm@6.14.15
npm install
```

Next, run the development server:
```bash
npm run dev
```
To login, request login credentials via Slack.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
For the UW application, use [http://uw.localhost:3000](http://uw.localhost:3000) with your browser to see the result.

## Branch Layout

There are 2 main branches you'll be interacting with: production, and master. master is where you will open your PR to once you've finished your task, once all issues are resolved and you merge your work into master, then master will automatically deploy to [https://cledge-dev-site.azurewebsites.net/](https://cledge-dev-site.azurewebsites.net/) which will be used to test what you implemented. Once testing is finished, you can open a PR to production and once that's merged, it is up to the person who approves the PR to manually deploy the production branch into UW and normal Production. Additionally, the production branch is protected and cannot be automatically merged to.

## Deploying to Azure

To deploy to Azure simply head over to the Actions tab in the repository and choose a deployment to run.
For deploying to production you can only deploy the production branch. master automatically deploys to the development site once anything has been pushed to it.
