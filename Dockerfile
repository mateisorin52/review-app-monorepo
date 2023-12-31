# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build api`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t api`.


# note to self: multi stage build is needed so that the build is is also built on the same system
FROM --platform=linux/amd64 node:16

ENV HOST=0.0.0.0
ENV PORT=3333

WORKDIR /app

COPY ./prisma prisma
COPY dist/apps/api .

RUN npm install

RUN npx prisma generate

CMD [ "node", "main.js" ]