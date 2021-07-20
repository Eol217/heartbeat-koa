### Heartbeat App

### Installation


`npm install`

### Running

This app requires docker or a local mongodb installation.  If using a local mongodb, see `app.module.ts` for connection options, and make sure there are matching options for the mongodb installation and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Environment Variables
Create a `.env` file from the `.example.env`

### Run the sample

Then, run the app as usual:

`npm run start`

