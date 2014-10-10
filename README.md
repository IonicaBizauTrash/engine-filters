Filters
===========

Filter module for Engine framework.

# Configuration
```js
{
    "roles": ENGINE_ROLES,
    "name": "instance_name",
    "config": {},
    "module": "github_ionicabizau_filters_v0.0.1",
    "O": {
        "events": [{
            "re": "^filtersSet$",
            "A": {
                "emit": [{
                    "event": "filtersSet",
                    "to": "..."
                }]
            }
        }]
    }
}
```

# Model Queries

The module needs the following model queries:

## `read`

```js
{
    "name": "read",
    "request": {
        "method": "find"
    },
    "add": {
        "options": "o",
        "query": "q"
    }
}
```

# Methods

## CRUD interface
**Not stable yet**

## `setFilters(event, data[, callback])`
Sets the query and options in filter instance

 - `event`: The event object
 - `data`: An object containing the following fields:
   - `query` {Object} The object containing the query fields that will be merged
   - `options` {Object} The object containing the option fields that will be merged
   - `_qReset` {Boolean} if true, the query object will be emptied
   - `_oReset` {Boolean} if true, the options object will be emptied

# Event interface

## Incoming Events
 - `setFilters` - calls `setFilters` method

## Outgoing Events
 - `filtersSet` - after setting the filters
 - `data:read` - after receiving data from server

# License
See the [LICENSE](./license) file.
