quotesApp.service('dashboardService', function () {
    var tempServiceFunctions = {

        drawPieChart: function (selector, rawData) {
            data = [];
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
                    content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
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

quotesApp.service('globalService', function () {
    var globalServiceFunctions = {
        applySelect2: function (selector) {
            $(selector).select2();
        }
    };

    return globalServiceFunctions;
});
