Z.wrap('github/ionicabizau/filters/v0.0.1/client/main.js', function (require, module, exports) {
    module.exports = function (config, ready) {

        var self = this;
        var config = self._conf;

        // Query and options
        self._query = {};
        self._options = {};

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
        self.setFilters = function (ev, data) {

            var what = null;
            var fields = ["query", "options"];

            // Reset data
            if (data._qReset) { resetObj(Filters._query); }
            if (data._oReset) { resetObj(Filters._options); }

            // Merge data
            for (var i = 0; i < fields.length; ++i) {
                var c = this;
                if (!(what = data[c])) { return; }
                var ref = Filters["_" + c];
                for (var f in config.options[c]) {
                    ref[f] = config.options[c][f];
                }
                for (var f in what) {
                    ref[f] = what[f];
                }
            }

            // Emit filtersSet event
            self.emit("filtersSet", ev, {
                query: self._query,
                optoins: self._options
            });
        };
    };

    return module;
});
