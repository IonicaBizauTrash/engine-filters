Z.wrap('github/ionicabizau/filters/v0.0.1/client/main.js', function (require, module, exports) {
    module.exports = function (config, ready) {

        var self = this;
        var config = self._conf;

        // Query and options
        self._query = {};
        self._options = {};

        var _errorHandler = function (err) {
            console.error(err);
        };

        var CRUD = {
            c: function () { /* TODO */ },
            r: function (_model, query, options, callback) {
                _model.req({
                    m: "find",
                    q: query,
                    o: options
                }, callback);
            },
            u: function () { /* TODO */ },
            d: function () { /* TODO */ }
        };


        // TODO
        self._crud = {};
        for (var op in CRUD) {
            (function (cOp, func) {
                self._crud[op] = function (ev, data) {
                    func(data._model, data.query, data.options, data._callback);
                };
            })(op, CRUD[op]);
        }

        function resetObj(obj) {
            for (var k in obj) {
                delete obj[k];
            }
        }

        /**
         * setFilters
         * Sets the query and options in filter instance
         *
         * @name setFilters
         * @function
         * @param {Object} ev The event object
         * @param {Object} data An object containing the following fields:
         *  - query {Object} The object containing the query fields that will be merged
         *  - options {Object} The object containing the option fields that will be merged
         *  - _qReset {Boolean} if true, the query object will be emptied
         *  - _oReset {Boolean} if true, the options object will be emptied
         * @return {undefined}
         */
        self.setFilters = function (ev, data, callback) {

            var what = null;
            var fields = ["query", "options"];

            // Reset data
            if (data._qReset) { resetObj(self._query); }
            if (data._oReset) { resetObj(self._options); }

            // Merge data
            for (var i = 0; i < fields.length; ++i) {
                var c = fields[i];
                if (!(what = data[c])) { return; }
                var ref = self["_" + c];
                for (var f in what) {
                    ref[f] = what[f];
                }
            }

            // Emit filtersSet event
            self.emit("filtersSet", ev, {
                query: self._query,
                options: self._options
            });

            if (data._fetchData === false) { return; }
            var model = data._model;
            if (typeof model === "string") {
                model = self.model[model];
            }

            CRUD.r(model, self._query, self._options, function (err, items) {
                if (typeof callback === "function") {
                    callback(err, items);
                }
                if (err) { return _errorHandler(err); }
                self.emit("data:read", ev, items);
            });
        };

        self.on("setFilters", self.setFilters);
        ready();
    };

    return module;
});
