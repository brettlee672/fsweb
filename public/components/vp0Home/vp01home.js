'use strict';

app.vp01home = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});
app.localization.registerView('vp01home');

(function (parent) {
    var
        vp01homeModel = kendo.observable({
            displayname: "",
            farmer: "",
            getcattle: function (e) {
                var args = [];
                args.push(vp01homeModel.cattleTagid);
                var result = app.queryApi("getCattle", args);
                if (result.status == 200) {
                    var data = JSON.parse(result.responseText);
                    var message = JSON.parse(data.result.message);
                    var model = vp01homeModel;

                    alert(message.cattleTag);
                }
            },
            createCattle: function (e) {
                var args = [];
                args.push(vp01homeModel.cattleid);
                args.push(vp01homeModel.cattletag);
                args.push(vp01homeModel.cattletype);
                args.push(vp01homeModel.cattleweight);
                args.push(localStorage.getItem("userName"));

                var result = app.invokeApi("createCattle", args);
                if (result.status == 200) {
                    var data = JSON.parse(result.responseText);
                    console.log(data);
                    app.showNotification("Cattle created successfully");
                }
            }
        });

    parent.set('vp01homeModel', vp01homeModel);

    parent.set('onShow', function (e) {

        //app.checkuser();

        if (e && e.view && e.view.params) {
            var name = e.view.params.name;
            vp01homeModel.set('displayname', name);
        }

        vp01homeModel.set('farmer', localStorage.getItem('username'));

    });
    
    parent.set('afterShow', function (e) {

    });
})(app.vp01home);
