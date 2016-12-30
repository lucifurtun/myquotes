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

quotesApp.service('globalService', function ($resource) {
    var globalServiceFunctions = {
        applySelect2: function (selector, type) {
            $(selector).select2({
                tags: true
            }).on("change", function (e) {
                var isNew = $(this).find('[data-select2-tag="true"]');
                if (isNew.length) {
                    var settings = {patch: {method: 'PATCH'}, delete: {method: 'DELETE'}};
                    var resource = $resource('/api/' + type + '/:id/', {id: '@id'}, settings);
                    resource.save({name: isNew.val()}, function (data) {
                        isNew.replaceWith('<option selected value="' + data.id + '">' + data.name + '</option>');
                    });
                }

            }).on("select2:unselect", function (e) {
                if ($(e.params.data.element).is('.newTag')) {
                    // TODO: Decide if we do something if tag unselected.
                }
            });
        }
    };

    return globalServiceFunctions;
});
