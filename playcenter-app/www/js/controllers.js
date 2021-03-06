angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state) {


        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {

            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.hide();
        };


        // Perform the login action when the user submits the login form
        $scope.doLogin = function (loginData) {
            console.log('Doing login', $scope.loginData);
            //StatusBar.hide();
            if($scope.loginData.password =="ASDF"){
                console.log('login sucessfull');
                $state.go('app.masvistas')
            }
            else{
                alert("CÓDIGO INCORRECTO");
            }
            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system



            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlayKid', ['kids', '$scope', '$stateParams', function (kids, $scope, $stateParams) {
        //console.log($stateParams.playlistTitulo);
        $scope.init = function(){
            $scope.getMovie()
        }
        $scope.init2 = function(){
            $scope.videoController();
        }
        $scope.getMovie = function(){
            $scope.id = $stateParams.id;
            console.log("id: " +$scope.id);
            kids.getKidById($scope.id).then(function(res){
                $scope.pelicula = kids.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.url = encodeURI($scope.pelicula[0].url_movie);
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
            }, function(err){
                console.log(err);
            })
        }
        $scope.videoController = function(){

            /**
             * @property interface
             * @type {Object}
             */
            $scope.interface = {};

            $scope.$on('$videoReady', function videoReady() {
                $scope.interface.options.setAutoplay(true);
                $scope.interface.sources.add($scope.url);

                $scope.video = document.getElementById('myMovie');
                console.log($scope.video);

                $scope.video.addEventListener("timeupdate", function(ev){
                    document.getElementById("currentTime").innerHTML = "currentTime: " +$scope.hourTransform($scope.interface.controls.currentTime());
                    document.getElementById("duration").innerHTML = "duration: "+$scope.hourTransform($scope.interface.controls.duration());
                    document.getElementById("volume").innerHTML = "volume: "+$scope.interface.controls.volume();
                    $scope.time = (($scope.interface.controls.currentTime())*100)/$scope.interface.controls.duration()+"%";
                    document.getElementById("timeporc").innerHTML = "Time %: "+$scope.time;
                }, true);




            });
        }

        $scope.hourTransform = function (segs){
            $scope.d = new Date(segs*1000);

            $scope.hora = ($scope.d.getHours() == 0)?23:$scope.d.getHours()-21;
            $scope.hora = ($scope.hora<9)?"0"+$scope.hora:$scope.hora;
            $scope.minuto = ($scope.d.getMinutes()<9)?"0"+$scope.d.getMinutes():$scope.d.getMinutes();
            $scope.segundo = ($scope.d.getSeconds()<9)?"0"+$scope.d.getSeconds():$scope.d.getSeconds();
            return $scope.hora + ":"+ $scope.minuto +":"+$scope.segundo;
        }

        $scope.check = function(e){
            //capture the mouse position
            console.log("Entre al check");
            $scope.posx = 0;
            if(!e) $scope.e = window.event;
            if($scope.e.pageX){
                $scope.posx = $scope.e.pageX;
            }
            else if($scope.e.clientX){
                $scope.posx = $scope.e.clientX;
            }

            console.log($scope.posx);

            //document.getElementById('timeBar').style.width = $scope.posx;
            $scope.position = (($scope.posx-33)*100)/620;
            $scope.position_porc = $scope.position+"%";
            console.log($scope.position);
            console.log($scope.position_porc);
            $scope.time = $scope.position_porc;

            $scope.interface.controls.setCurrentTime(($scope.interface.controls.duration() * $scope.position)/100);

        }

        $scope.funcBack = function(){
            document.location.href ='#/app/playlistsMovie/' + $scope.id;

        }

        $scope.IsVisibleControls = false;

        $scope.ShowHide = function (){
            $scope.IsVisibleControls = !$scope.IsVisibleControls;
            console.log("SHOWHIDE");
        }

        $scope.init();
        $scope.init2();
    }])

    .controller('PlayShort', ['shorts', '$scope', '$stateParams', function (shorts, $scope, $stateParams) {
        //console.log($stateParams.playlistTitulo);
        $scope.init = function(){
            $scope.getMovie()
        }
        $scope.init2 = function(){
            $scope.videoController();
        }
        $scope.getMovie = function(){
            $scope.id = $stateParams.id;
            console.log("id: " +$scope.id);
            shorts.getShortById($scope.id).then(function(res){
                $scope.pelicula = shorts.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.url = encodeURI($scope.pelicula[0].url_movie);
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
            }, function(err){
                console.log(err);
            })
        }
        $scope.videoController = function(){

            /**
             * @property interface
             * @type {Object}
             */
            $scope.interface = {};

            $scope.$on('$videoReady', function videoReady() {
                $scope.interface.options.setAutoplay(true);
                $scope.interface.sources.add($scope.url);

                $scope.video = document.getElementById('myMovie');
                console.log($scope.video);

                $scope.video.addEventListener("timeupdate", function(ev){
                    document.getElementById("currentTime").innerHTML = "currentTime: " +$scope.hourTransform($scope.interface.controls.currentTime());
                    document.getElementById("duration").innerHTML = "duration: "+$scope.hourTransform($scope.interface.controls.duration());
                    document.getElementById("volume").innerHTML = "volume: "+$scope.interface.controls.volume();
                    $scope.time = (($scope.interface.controls.currentTime())*100)/$scope.interface.controls.duration()+"%";
                    document.getElementById("timeporc").innerHTML = "Time %: "+$scope.time;
                }, true);




            });
        }

        $scope.hourTransform = function (segs){
            $scope.d = new Date(segs*1000);

            $scope.hora = ($scope.d.getHours() == 0)?23:$scope.d.getHours()-21;
            $scope.hora = ($scope.hora<9)?"0"+$scope.hora:$scope.hora;
            $scope.minuto = ($scope.d.getMinutes()<9)?"0"+$scope.d.getMinutes():$scope.d.getMinutes();
            $scope.segundo = ($scope.d.getSeconds()<9)?"0"+$scope.d.getSeconds():$scope.d.getSeconds();
            return $scope.hora + ":"+ $scope.minuto +":"+$scope.segundo;
        }

        $scope.check = function(e){
            //capture the mouse position
            console.log("Entre al check");
            $scope.posx = 0;
            if(!e) $scope.e = window.event;
            if($scope.e.pageX){
                $scope.posx = $scope.e.pageX;
            }
            else if($scope.e.clientX){
                $scope.posx = $scope.e.clientX;
            }

            console.log($scope.posx);

            //document.getElementById('timeBar').style.width = $scope.posx;
            $scope.position = (($scope.posx-33)*100)/620;
            $scope.position_porc = $scope.position+"%";
            console.log($scope.position);
            console.log($scope.position_porc);
            $scope.time = $scope.position_porc;

            $scope.interface.controls.setCurrentTime(($scope.interface.controls.duration() * $scope.position)/100);

        }

        $scope.funcBack = function(){
            document.location.href ='#/app/playlistsMovie/' + $scope.id;

        }

        $scope.IsVisibleControls = false;

        $scope.ShowHide = function (){
            $scope.IsVisibleControls = !$scope.IsVisibleControls;
            console.log("SHOWHIDE");
        }

        $scope.init();
        $scope.init2();
    }])

    .controller('PlayDoc', ['documentales', '$scope', '$stateParams', function (documentales, $scope, $stateParams) {
        //console.log($stateParams.playlistTitulo);
        $scope.init = function(){
            $scope.getMovie()
        }
        $scope.init2 = function(){
            $scope.videoController()
        }
        $scope.getMovie = function(){
            $scope.id = $stateParams.id;
            console.log("id: " +$scope.id);
            documentales.getDocumentalById($scope.id).then(function(res){
                $scope.pelicula = documentales.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.url = encodeURI($scope.pelicula[0].url_movie);
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
            }, function(err){
                console.log(err);
            })
        }

        $scope.videoController = function(){

            /**
             * @property interface
             * @type {Object}
             */
            $scope.interface = {};

            $scope.$on('$videoReady', function videoReady() {
                $scope.interface.options.setAutoplay(true);
                $scope.interface.sources.add($scope.url);

                $scope.video = document.getElementById('myMovie');
                console.log($scope.video);

                $scope.video.addEventListener("timeupdate", function(ev){
                    document.getElementById("currentTime").innerHTML = "currentTime: " +$scope.hourTransform($scope.interface.controls.currentTime());
                    document.getElementById("duration").innerHTML = "duration: "+$scope.hourTransform($scope.interface.controls.duration());
                    document.getElementById("volume").innerHTML = "volume: "+$scope.interface.controls.volume();
                    $scope.time = (($scope.interface.controls.currentTime())*100)/$scope.interface.controls.duration()+"%";
                    document.getElementById("timeporc").innerHTML = "Time %: "+$scope.time;
                }, true);




            });
        }

        $scope.hourTransform = function (segs){
            $scope.d = new Date(segs*1000);

            $scope.hora = ($scope.d.getHours() == 0)?23:$scope.d.getHours()-21;
            $scope.hora = ($scope.hora<9)?"0"+$scope.hora:$scope.hora;
            $scope.minuto = ($scope.d.getMinutes()<9)?"0"+$scope.d.getMinutes():$scope.d.getMinutes();
            $scope.segundo = ($scope.d.getSeconds()<9)?"0"+$scope.d.getSeconds():$scope.d.getSeconds();
            return $scope.hora + ":"+ $scope.minuto +":"+$scope.segundo;
        }

        $scope.check = function(e){
            //capture the mouse position
            console.log("Entre al check");
            $scope.posx = 0;
            if(!e) $scope.e = window.event;
            if($scope.e.pageX){
                $scope.posx = $scope.e.pageX;
            }
            else if($scope.e.clientX){
                $scope.posx = $scope.e.clientX;
            }

            console.log($scope.posx);

            //document.getElementById('timeBar').style.width = $scope.posx;
            $scope.position = (($scope.posx-33)*100)/620;
            $scope.position_porc = $scope.position+"%";
            console.log($scope.position);
            console.log($scope.position_porc);
            $scope.time = $scope.position_porc;

            $scope.interface.controls.setCurrentTime(($scope.interface.controls.duration() * $scope.position)/100);

        }

        $scope.funcBack = function(){
            document.location.href ='#/app/playlistsMovie/' + $scope.id;

        }

        $scope.IsVisibleControls = false;

        $scope.ShowHide = function (){
            $scope.IsVisibleControls = !$scope.IsVisibleControls;
            console.log("SHOWHIDE");
        }

        $scope.init();
        $scope.init2();
    }])

    .controller('PlayMovie', ['movies', '$scope', '$stateParams', function (movies, $scope, $stateParams) {
        //console.log($stateParams.playlistTitulo);
        $scope.$on('$ionicView.beforeEnter', function(){
            screen.lockOrientation('landscape');
        });
        $scope.init = function(){
            $scope.getMovie()
        }
        $scope.init2 = function(){
            $scope.videoController()
        }
        $scope.getMovie = function(){
            $scope.id = $stateParams.id;
            console.log("id: " +$scope.id);
            movies.getMovieById($scope.id).then(function(res){
                $scope.pelicula = movies.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.id = $scope.pelicula[0].id;
                $scope.url = encodeURI($scope.pelicula[0].url_movie);
                $scope.url_trailer = $scope.pelicula[0].url_trailer;
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
            }, function(err){
                console.log(err);
            })
        }
        $scope.videoController = function(){

            /**
             * @property interface
             * @type {Object}
             */
            $scope.interface = {};

            $scope.$on('$videoReady', function videoReady() {
                $scope.interface.options.setAutoplay(true);
                $scope.interface.sources.add($scope.url);

                $scope.video = document.getElementById('myMovie');
                console.log($scope.video);

                $scope.video.addEventListener("timeupdate", function(ev){
                    document.getElementById("currentTime").innerHTML = "currentTime: " +$scope.hourTransform($scope.interface.controls.currentTime());
                    document.getElementById("duration").innerHTML = "duration: "+$scope.hourTransform($scope.interface.controls.duration());
                    document.getElementById("volume").innerHTML = "volume: "+$scope.interface.controls.volume();
                    $scope.time = (($scope.interface.controls.currentTime())*100)/$scope.interface.controls.duration()+"%";
                    document.getElementById("timeporc").innerHTML = "Time %: "+$scope.time;
                }, true);




            });
        }

        $scope.hourTransform = function (segs){
            $scope.d = new Date(segs*1000);

            $scope.hora = ($scope.d.getHours() == 0)?23:$scope.d.getHours()-21;
            $scope.hora = ($scope.hora<9)?"0"+$scope.hora:$scope.hora;
            $scope.minuto = ($scope.d.getMinutes()<9)?"0"+$scope.d.getMinutes():$scope.d.getMinutes();
            $scope.segundo = ($scope.d.getSeconds()<9)?"0"+$scope.d.getSeconds():$scope.d.getSeconds();
            return $scope.hora + ":"+ $scope.minuto +":"+$scope.segundo;
        }

        $scope.check = function(e){
            //capture the mouse position
            console.log("Entre al check");
            $scope.posx = 0;
            if(!e) $scope.e = window.event;
           if($scope.e.pageX){
               $scope.posx = $scope.e.pageX;
           }
           else if($scope.e.clientX){
               $scope.posx = $scope.e.clientX;
           }

           console.log($scope.posx);

           //document.getElementById('timeBar').style.width = $scope.posx;
            $scope.position = (($scope.posx-33)*100)/620;
            $scope.position_porc = $scope.position+"%";
            console.log($scope.position);
            console.log($scope.position_porc);
            $scope.time = $scope.position_porc;

            $scope.interface.controls.setCurrentTime(($scope.interface.controls.duration() * $scope.position)/100);

        }

        $scope.funcBack = function(){
            document.location.href ='#/app/playlistsMovie/' + $scope.id;

        }

        $scope.IsVisibleControls = false;

        $scope.ShowHide = function (){
            $scope.IsVisibleControls = !$scope.IsVisibleControls;
            console.log("SHOWHIDE");
        }



        $scope.init();
        $scope.init2();



    }])

    .controller('playlistExploraCtrl', ['categorias', '$scope', '$stateParams', function(categorias, $scope, $stateParams){

        console.log($stateParams);
        console.log("Estoy en el controlador");

        $scope.init = function(){
            console.log("Estoy en init()");
            $scope.getCategoria();
            $scope.type = "Movie";
        }
        $scope.getCategoria = function(){
            console.log("Estoy en getCategoria");
            $scope.id = $stateParams.id;
            console.log($scope.id);
            categorias.getCategoriaById($scope.id).then(function(res){
                $scope.peliculas = categorias.lista;
                $scope.titulo = $scope.peliculas[0].titulo;
                $scope.descripcion = $scope.peliculas[0].descripcion_short;
                $scope.cover = ($scope.peliculas[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
                console.log($scope.cover_1280);
                console.log($scope.cover);
                $scope.stars = $scope.peliculas[0].star_rating;
                console.log($scope.stars);
                $scope.url = encodeURI($scope.pelicula[0].url_trailer);
                console.log($scope.url);
            }, function(err){
                console.log(err);
            })
        };

        $scope.count = 2;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);

            document.location.href ='#/app/playlistsMovie/playMovie/' + $scope.id;
        };
        $scope.init();
    }])


    .controller('playlistMovieCtrl', ['movies', '$scope', '$stateParams', function(movies, $scope, $stateParams){

        console.log($stateParams);
        console.log("Estoy en el controlador");
        $scope.init = function(){
            console.log("Estoy en init()");
            $scope.getMovie();
        }
        $scope.getMovie = function(){
            console.log("Estoy en getMovie");
            $scope.id = $stateParams.id;
            console.log($scope.id);
            movies.getMovieById($scope.id).then(function(res){
                $scope.pelicula = movies.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.descripcion = $scope.pelicula[0].descripcion_short;
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
                console.log($scope.cover_1280);
                console.log($scope.cover);
                $scope.stars = $scope.pelicula[0].star_rating;
                console.log($scope.stars);
                $scope.url = encodeURI($scope.pelicula[0].url_trailer);
                console.log($scope.url);
            }, function(err){
                console.log(err);
            })
        };

        $scope.count = 2;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);

            document.location.href ='#/app/playlistsMovie/playMovie/' + $scope.id;
        };
        $scope.init();
    }])

    .controller('playlistDocCtrl', ['documentales', '$scope', '$stateParams', function(documentales, $scope, $stateParams){

        console.log($stateParams);
        console.log("Estoy en el controlador");
        $scope.init = function(){
            console.log("Estoy en init()");
            $scope.getDoc();
        }
        $scope.getDoc = function(){
            console.log("Estoy en getDoc");
            $scope.id = $stateParams.id;
            console.log($scope.id);
            documentales.getDocumentalById($scope.id).then(function(res){
                $scope.pelicula = documentales.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.descripcion = $scope.pelicula[0].descripcion_short;
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "1280.jpg";
                console.log($scope.cover_1280);
                console.log($scope.cover);
                $scope.stars = $scope.pelicula[0].star_rating;
                console.log($scope.stars);
                $scope.url = encodeURI($scope.pelicula[0].url_trailer);
                console.log($scope.url);
            }, function(err){
                console.log(err);
            })
        };

        $scope.count = 2;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);

            document.location.href ='#/app/playlistsMovie/playDoc/' + $scope.id;
        };
        $scope.init();
    }])

    .controller('playlistShortCtrl', ['shorts', '$scope', '$stateParams', function(shorts, $scope, $stateParams){

        console.log($stateParams);
        console.log("Estoy en el controlador");
        $scope.init = function(){
            console.log("Estoy en init()");
            $scope.getShort();
        }
        $scope.getShort = function(){
            console.log("Estoy en getShort");
            $scope.id = $stateParams.id;
            console.log($scope.id);
            shorts.getShortById($scope.id).then(function(res){
                $scope.pelicula = shorts.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.descripcion = $scope.pelicula[0].descripcion_short;
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
                console.log($scope.cover_1280);
                console.log($scope.cover);
                $scope.stars = $scope.pelicula[0].star_rating;
                console.log($scope.stars);
                $scope.url = encodeURI($scope.pelicula[0].url_trailer);
                console.log($scope.url);
            }, function(err){
                console.log(err);
            })
        };

        $scope.count = 2;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);

            document.location.href ='#/app/playlistsMovie/playShort/' + $scope.id;
        };
        $scope.init();
    }])

    .controller('playlistKidCtrl', ['kids', '$scope', '$stateParams', function(kids, $scope, $stateParams){

        console.log($stateParams);
        console.log("Estoy en el controlador");
        $scope.init = function(){
            console.log("Estoy en init()");
            $scope.getKid();
        }
        $scope.getKid = function(){
            console.log("Estoy en getDoc");
            $scope.id = $stateParams.id;
            console.log($scope.id);
            kids.getKidById($scope.id).then(function(res){
                $scope.pelicula = kids.lista;
                $scope.titulo = $scope.pelicula[0].titulo;
                $scope.descripcion = $scope.pelicula[0].descripcion_short;
                $scope.cover = ($scope.pelicula[0].url_cover);
                $scope.cover_1280 = $scope.cover + "_1280.jpg";
                console.log($scope.cover_1280);
                console.log($scope.cover);
                $scope.stars = $scope.pelicula[0].star_rating;
                console.log($scope.stars);
                $scope.url = encodeURI($scope.pelicula[0].url_trailer);
                console.log($scope.url);
            }, function(err){
                console.log(err);
            })
        };

        $scope.count = 2;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);

            document.location.href ='#/app/playlistsMovie/playKid/' + $scope.id;
        };
        $scope.init();
    }])

    .controller('servicioExploraCtrl', ['categorias','$scope', '$log', '$http', function(categorias, $scope){
        $scope.init = function(){
            $scope.type = "Explora";
            $scope.getAll();
        }
        $scope.getAll = function(){
            categorias.getAllCategorias().then(function(res){
                $scope.categorias = categorias.lista;
                console.log($scope.categorias[0].id);
            }, function(err){
                console.log(err);
            })
        };
        $scope.init();
    }])


    .controller('servicioMasvistoCtrl', ['masvistos','$scope', '$log', '$http', function(masvistos, $scope){
        $scope.init = function(){

            $scope.getAll();
        }
        $scope.getAll = function(){
            masvistos.getAllMasvistos().then(function(res){
                $scope.peliculas = masvistos.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        $scope.init();
    }])

    .controller('servicioMovieCtrl2', ['movies','$scope', '$log', '$http', function(movies, $scope){
        $scope.init = function(){
            $scope.type = "Movie";
            $scope.getAll();
        }
        $scope.getAll = function(){
            movies.getAllMovies().then(function(res){
                $scope.peliculas = movies.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        $scope.IsVisible = false;
        $scope.IsVisible2 = false;

        $scope.ShowHide = function (){
            $scope.IsVisible = $scope.IsVisible = true;
        }
        $scope.ShowHide2 = function(){
            $scope.IsVisible2 = $scope.IsVisible2 = true;
        }
        $scope.Hide = function(){
            $scope.IsVisible2 = $scope.IsVisible2 = false;
            $scope.IsVisible = $scope.IsVisible = false;
        }



        $scope.init();
    }])

    .controller('servicioMovieCtrl', ['movies','$scope', '$log', '$http', function(movies, $scope){
        $scope.init = function(){
            $scope.type = "Movie";
            $scope.getAll();
        }
        $scope.getAll = function(){
            movies.getAllMovies().then(function(res){
                $scope.peliculas = movies.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        $scope.IsVisible = false;

        $scope.ShowHide = function (){
            $scope.IsVisible = $scope.IsVisible = true;
        }

        $scope.init();
    }])


    .controller('servicioDocCtrl', ['documentales', '$scope', '$log', '$http', function (documentales, $scope) {
        $scope.init = function(){
            $scope.type = "Doc";
            $scope.getAll();
        }
        $scope.getAll = function(){
            documentales.getAllDocumentales().then(function(res){
                $scope.peliculas = documentales.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        console.log("servicioDocCtrl");
        $scope.init();

    }])

    .controller('servicioShortCtrl', ['shorts', '$scope', '$log', '$http', function (shorts, $scope) {
        $scope.init = function(){
            $scope.type = "Short";
            $scope.getAll();
        }
        $scope.getAll = function(){
            shorts.getAllShorts().then(function(res){
                $scope.peliculas = shorts.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        console.log("servicioShortsCtrl");
        $scope.init();

    }])

    .controller('servicioKidCtrl', ['kids', '$scope', '$log', '$http', function (kids, $scope) {
        $scope.init = function(){
            $scope.type = "Kid";
            $scope.getAll();
        }
        $scope.getAll = function(){
            kids.getAllKids().then(function(res){
                $scope.peliculas = kids.lista;
                console.log($scope.peliculas[0].id);
            }, function(err){
                console.log(err);
            })
        };
        $scope.init();
        console.log("servicioKidCtrl");

    }])

    /* .controller('servicioMovieCtrl', function (movies, $scope, $log, $http) {
        movies.getAllMovies()
            .then(function (res) {
                $scope.peliculas = {};
                $scope.peliculas = res.data;
                console.log(res.data[0].titulo);
            });


    })*/


    .controller('myCtrl', ['$scope', function($scope) {
        $scope.count = 0;
        $scope.myFunc = function() {
            $scope.count++;
            console.log($scope.count);
        };
    }])

    .controller('servicioLibraryCtrl', function ($scope, $http) {
        $http.get("http://172.16.10.3/playcenter/mediacenter/classes/media.php?op=cienciaficcion"
            , {cache: true})
            .then(function (response) {
                $scope.cfs = {};
                $scope.cfs = response.data;
                console.log(response.data[0].titulo);
            });


    })







    .controller('DashCtrl', function(){})




    .filter('trusted', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    }]);