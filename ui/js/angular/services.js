quotesApp.service('dashboardService', function () {
    var tempServiceFunctions = {

        drawPieChart: function (selector, rawData) {
            var data = [];
            for (var i = 0; i < rawData.length; i++) {
                data.push({
                    label: rawData[i].name,
                    data: rawData[i].quotes
                });
            }

            $.plot($(selector), data, {
                series: {
                    pie: {
                        show: true
                    }
                },
                grid: {
                    hoverable: true
                },
                tooltip: true,
                tooltipOpts: {
                    content: '%p.0%, %s', // show percentages, rounding to 2 decimal places
                    shifts: {
                        x: 20,
                        y: 0
                    },
                    defaultTheme: true
                }
            });
        }
    };

    return tempServiceFunctions;
});

quotesApp.service('globalService', function ($resource, $timeout) {
    var globalServiceFunctions = {
        applySelect2: function ($scope, selector, attrs) {
            $scope.$watchCollection(attrs.select2, function (options) {
                var data = typeof options.data !== 'undefined' ? options.data : null;
                var type = typeof options.type !== 'undefined' ? options.type : null;
                var ajax = typeof options.ajax !== 'undefined' ? options.ajax : null;

                var ajaxConfig = {
                    url: ajax,
                    delay: 400,
                    dataType: 'json',
                    data: function (params) {
                        return {
                            name: params.term,
                            page: params.page
                        };
                    },
                    processResults: function (data) {
                        var items = [];

                        for (var i = 0; i < data.length; i++) {
                            items.push({
                                id: data[i].name,
                                text: data[i].name
                            });
                        }

                        return {
                            results: items
                        };
                    }
                };

                $(selector).select2({
                    tags: true,
                    ajax: ajax === null ? null : ajaxConfig
                }).on('select2:select', function (e, triggered) {
                    $timeout(function () {
                        if (type === 'manual') {
                            $scope.$parent.quoteData[e.currentTarget.name] = e.params.data.id.toString();
                        }
                    });
                });
            });
        }
    };

    return globalServiceFunctions;
});
