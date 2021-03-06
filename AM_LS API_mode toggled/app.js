'use strict';

(function() {
    var app = {
        data: {}
    };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            var element = document.getElementById('appDrawer');
            if (typeof(element) != 'undefined' && element !== null) {
                if (window.navigator.msPointerEnabled) {
                    $('#navigation-container').on('MSPointerDown', 'a', function(event) {
                        app.keepActiveState($(this));
                    });
                } else {
                    $('#navigation-container').on('touchstart', 'a', function(event) {
                        app.keepActiveState($(this));
                    });
                }
            }           
            
            
            var customOptions = {
            acceptUpdateText: "Accept",
            declineUpdateText: "Decline",
            mandatoryUpdateText: "Critical update available for this app. Please install it immediately."
            };
            
            var onSuccess = function() {
                appManagerLiveSync.tryUpdate(function onSuccessUpdate(newVersion) {
                    alert("Patch to version::::: " + newVersion);
                },
                function onErrorUpdate(err) {
                    alert(err);
                });
            };
            
            var onError = function(err) { alert(err) };
            
            appManagerLiveSync.options(customOptions, onSuccess, onError);
            
            document.addEventListener("resume", function() {
            var customOptions = {
                acceptUpdateText: "Accept",
                declineUpdateText: "Decline",
                mandatoryUpdateText: "Critical update available for this app. Please install it immediately."
            };            
            var onSuccess = function() {
                appManagerLiveSync.tryUpdate(function onSuccessUpdate(newVersion) {
                    alert("Patch to version::::: " + newVersion);
                },
                function onErrorUpdate(err) {
                    alert(err);
                });
             };            
             var onError = function(err) { alert(err) };            
             appManagerLiveSync.options(customOptions, onSuccess, onError);
            
        }, false);
            
            bootstrap();
        }, false);
        
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_kendoUiMobileApp
