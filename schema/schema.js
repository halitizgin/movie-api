const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLID,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = graphql;

const movies = [
    {
        id: '1',
        title: 'The Godfather',
        description: 'The Godfather açıklama',
        year: 1972,
        directorId: '1'
    },
    {
        id: '2',
        title: 'Scarface',
        description: 'Scarface açıklama',
        year: 1980,
        directorId: '3'
    },
    {
        id: '3',
        title: 'Pulp Fiction',
        description: 'Pulp Fiction açıklama',
        year: 1994,
        directorId: '2'
    },
    {
        id: '4',
        title: 'Apocalypse Now',
        description: 'Apocalypse Now açıklaması',
        year: 1979,
        directorId: '1'
    },
    {
        id: '5',
        title: 'Reservoir Dogs',
        description: 'Reservoir Dogs açıklaması',
        year: 1979,
        directorId: '3'
    }
];

const directors = [
    {
        id: '1',
        name: 'Francis Ford Coppola',
        birth: 1939
    },
    {
        id: '2',
        name: 'Brian De Palma',
        birth: 1940
    },
    {
        id: '3',
        name: 'Quentin Tarantino',
        birth: 1963
    }
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        movie: { 
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(movies, { id: args.id });
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return movies;
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(directors, { id: args.id });
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args){
                return directors;
            }
        }
    })
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type:  GraphQLID},
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        director: { 
            type: DirectorType,
            resolve(parent, args){
                return _.find(directors, { id: parent.directorId });
            }
        }
    })
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
        movies: { 
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return _.filter(movies, { directorId: parent.id });
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});