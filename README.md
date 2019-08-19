# graphql-cli-graphback-plugin
Plugin to enable using Graphback commands in GraphQL-cli

## Graphback
Graphback is a CLI tool that can help you bootstrap a GraphQL server and client for you including GraphQL schema, resolvers and generating database structure. Graphback addresses the difficulty in configuring a GraphQL server from scratch.

## Installation
Install `graphql-cli` using
```
npm i -g graphql-cli
```

Install the plugin using
```
npm i -g graphql-cli-graphback-plugin
```
## Usage
Installing the plugin exposes the [commands](https://graphback.dev/docs/commands) of Graphback. All the commands are prefixed with `backend`. For example `graphql backend init` is the equivalent of `graphback init`.

### `graphql backend init`
The command will guide you through a series of questions - choosing a template, bootstraping model, selecting preferred database - and setup your project for you.

```
graphql backend init <project name>
```

You can also provide a custom template of your choice with `--templateUrl` option.
```
graphql backend init <project name> ---templateUrl=https://github.com/aerogear/modern-appdev-workshop
```

### `graphql backend generate`
The command will generate schema and resolvers, with CRUD operations according to your GraphQL data model. The schema and resolvers are in the widely accepted apollo format.

### `graphql backend db`
The command will create database resources according to your datamodel(including tables and relationships). Running the commands recreates the database structure i.e. drops all existing data.

Run the created server using the scripts present.