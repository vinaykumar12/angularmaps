angular.module('angular-google-maps-vinay',[])
    .value('rndAddToLocation',function(){
        return Math.floor(((Math.random() < 0.5 ? -1:1)*2)+1);
    })
    .config(['uiGmapGoogleMapApiProvider',function(GoogleMapApi){
        GoogleMapApi.configure({

            libraries:'weather,geometry,visualization'
        });
    }])
    .run(['$templateCache',function($templateCache){

        $templateCache.put('control.tpl.html','<button class="btn btn-sm btn-primary" ng-class="{\'btn-warning\': danger}" ng-click="controlClick()">{{controlText}}</button>');


    }])
    .controller('controlController', function ($scope) {
        $scope.controlText = 'I\'m a custom control';
        $scope.danger = false;
        $scope.controlClick = function () {
            $scope.danger = !$scope.danger;
            alert('custom control clicked!');
        };
    })
    .controller('ExampleController',['$scope', '$timeout', 'uiGmapLogger', '$http', 'rndAddToLatLon','uiGmapGoogleMapApi',
        function ($scope, $timeout, $log, $http, rndAddToLatLon,GoogleMapApi){

            $log.currentLevel=$log.LEVELS.debug;

            GoogleMapApi.then(function(maps){
                $scope.googleVersion=maps.version;
                maps.visualRefresh = true;
                $log.info('$scope.map.rectangle.bounds set');

                $scope.map.rectangle.bounds=new maps.LatLngBounds(
                    new maps.LatLng(55,-100),
                    new maps.LatLng(49,-78)
                );
                $scope.map.polylines=[
                    {
                        id:1,
                        path:[
                            {
                                latitude: 45,
                                longitude: -74
                            },
                            {
                                latitude: 30,
                                longitude: -89
                            },
                            {
                                latitude: 37,
                                longitude: -122
                            },
                            {
                                latitude: 60,
                                longitude: -95
                            }
                        ],
                        stroke:{
                            color:'#6060FB',
                            weight:3
                        },
                        editable:true,
                        draggable:true,
                        geodesic:true,
                        visible:true,
                        icons:[
                            {
                                icon:{
                                    path:google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset:'25px',
                                repeat:'50px'
                            }
                        ]
                    },
                    {
                        id:2,
                        path:[
                            {
                                latitude: 45,
                                longitude: -74
                            },
                            {
                                latitude: 30,
                                longitude: -89
                            },
                            {
                                latitude: 37,
                                longitude: -122
                            },
                            {
                                latitude: 60,
                                longitude: -95
                            }
                        ],
                        stroke:{
                            color:'#6060FB',
                            weight:3
                        },
                        editable:true,
                        draggable:true,
                        geodesic:true,
                        visible:true,
                        icons:[
                            {
                                icon:{
                                    path:google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset:'25px',
                                repeat:'50px'
                            }
                        ]
                    },
                    {
                        id:3,
                        path:[
                            {
                                latitude: 45,
                                longitude: -74
                            },
                            {
                                latitude: 30,
                                longitude: -89
                            },
                            {
                                latitude: 37,
                                longitude: -122
                            },
                            {
                                latitude: 60,
                                longitude: -95
                            }
                        ],
                        stroke:{
                            color:'#6060FB',
                            weight:3
                        },
                        editable:true,
                        draggable:true,
                        geodesic:true,
                        visible:true,
                        icons:[
                            {
                                icon:{
                                    path:google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                                },
                                offset:'25px',
                                repeat:'50px'
                            }
                        ]
                    }

                ];
            })

            var versionUrl = (window.location.host === "rawgithub.com" || window.location.host === "rawgit.com") ?
                "../package.json" : "/package.json";

            $http.get(versionUrl).success(function (data) {
                if (!data)
                    console.error("no version object found!!");
                $scope.version = data.version;
            });

        }]);